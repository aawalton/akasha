import { expect, mock, test } from "bun:test"

const SECRET = "a-relay-secret-existing-only-in-this-test"

const POINTS = [
  "readout/attribute-strength",
  "readout/attribute-endurance",
  "readout/attribute-constitution",
  "readout/attribute-wisdom",
  "readout/attribute-intelligence",
  "readout/attribute-charisma",
]

const ASKED: string[] = []

const CARRIED: string[] = []

let unnamed: string | null = null

let refused: string | null = null

const pageFor = (named: string): string => {
  const slug = named.slice(named.indexOf("/") + 1)
  return `alan/attributes/readouts/${slug}/${slug}.readout.ts`
}

const relay = await import("akasha/alan/harness/readouts/relay/readout-relay.module.code.ts")

const composing = await import(
  "akasha/infrastructure/services/workstations/run-composing/run-composing.module.code.ts"
)

mock.module(
  "akasha/infrastructure/services/workstations/run-composing/run-composing.module.code.ts",
  () => ({
    ...composing,
    pathOf: (_root: string, named: string) => {
      ASKED.push(named)
      if (named === unnamed) return { refused: `${named} names no page` }
      return pageFor(named)
    },
  })
)

mock.module("akasha/alan/harness/readouts/relay/readout-relay.module.code.ts", () => ({
  ...relay,
  carryReadingBeside: (_root: string, page: string, to: string) => {
    if (page === refused) return Promise.reject(new Error(`${to} answered 500`))
    CARRIED.push(page)
    return Promise.resolve(`a reading taken now carried to ${to}`)
  },
}))

const running = await import(
  "akasha/alan/harness/attributes/relay-service/attributes-relay-service.service-workstation.running.code.ts"
)

const ran = async (): Promise<undefined> => {
  ASKED.length = 0
  CARRIED.length = 0
  process.env[relay.RELAY_SECRET_NAME] = SECRET
  await running.runService()
  return undefined
}

test("the run is a function taking nothing, which is how the service runner calls it", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
})

test("the run is the only way into this file, so the service has one entry", () => {
  expect(Object.keys(running)).toEqual(["runService"])
})

test("a run carries all six attribute points to the site that shows them", async () => {
  unnamed = null
  refused = null
  await ran()
  expect(CARRIED).toEqual(POINTS.map(pageFor))
})

test("each point is reached by that readout's own name rather than by a path", async () => {
  unnamed = null
  refused = null
  await ran()
  expect(ASKED).toEqual(POINTS)
})

test("a carry that fails to one tile does not stop the carry to another tile", async () => {
  unnamed = null
  refused = pageFor("readout/attribute-constitution")
  await ran()
  expect(CARRIED).toEqual(POINTS.filter((one) => pageFor(one) !== refused).map(pageFor))
})

test("a point the index names no page for costs its own carry rather than the rest", async () => {
  unnamed = "readout/attribute-charisma"
  refused = null
  await ran()
  expect(CARRIED).toEqual(POINTS.filter((one) => one !== unnamed).map(pageFor))
})

test("a run with no relay secret stated refuses rather than carrying nothing quietly", async () => {
  unnamed = null
  refused = null
  CARRIED.length = 0
  delete process.env[relay.RELAY_SECRET_NAME]
  await expect(running.runService()).rejects.toThrow(relay.RELAY_SECRET_NAME)
  expect(CARRIED).toEqual([])
})
