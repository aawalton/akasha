import { expect, mock, test } from "bun:test"

const SECRET = "a-relay-secret-existing-only-in-this-test"

const POINT = "readout/upkeep-plants"

const SHOWN_AT = ["https://alanwalton.com", "https://smilingjenny.me"]

const ASKED: string[] = []

const CARRIED: string[] = []

let unnamed: string | null = null

let refused: string | null = null

const pageFor = (named: string): string => {
  const slug = named.slice(named.indexOf("/") + 1)
  return `alan/harness/readouts/pages/${slug}/${slug}.readout.ts`
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
    if (to === refused) return Promise.reject(new Error(`${to} answered 500`))
    CARRIED.push(to)
    return Promise.resolve(`a reading beside ${page} carried to ${to}`)
  },
}))

const running = await import(
  "akasha/alan/harness/plants/relay-service/plants-relay-service.service-workstation.running.code.ts"
)

const carriedWith = async (
  noPageFor: string | null,
  refusing: string | null
): Promise<readonly string[]> => {
  unnamed = noPageFor
  refused = refusing
  ASKED.length = 0
  CARRIED.length = 0
  process.env[relay.RELAY_SECRET_NAME] = SECRET
  await running.runService()
  return CARRIED
}

test("the run is a function taking nothing, which is how the service runner calls it", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
})

test("the run is the only way into this file, so the service has one entry", () => {
  expect(Object.keys(running)).toEqual(["runService"])
})

test("a run carries the plant grams to both sites that show them", async () => {
  expect(await carriedWith(null, null)).toEqual(SHOWN_AT)
})

test("the readout is reached by its own name rather than by a path", async () => {
  await carriedWith(null, null)
  expect(ASKED).toEqual([POINT, POINT])
})

test("a carry that fails to one site does not stop the carry to another site", async () => {
  expect(await carriedWith(null, "https://alanwalton.com")).toEqual(["https://smilingjenny.me"])
})

test("a readout the index names no page for is said rather than stopping the run", async () => {
  expect(await carriedWith(POINT, null)).toEqual([])
  expect(ASKED).toEqual([POINT, POINT])
})

test("a run with no relay secret stated refuses rather than carrying nothing quietly", async () => {
  unnamed = null
  refused = null
  CARRIED.length = 0
  delete process.env[relay.RELAY_SECRET_NAME]
  await expect(running.runService()).rejects.toThrow(relay.RELAY_SECRET_NAME)
  expect(CARRIED).toEqual([])
})
