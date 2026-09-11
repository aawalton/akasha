import { expect, mock, test } from "bun:test"

const SECRET = "a-surplus-relay-secret-made-up-for-this-file-alone"

const POINT = "readout/upkeep-surplus"

const SITES = ["https://alanwalton.com", "https://smilingjenny.me"]

const ASKED: string[] = []

const REACHED: string[] = []

let unnamed: string | null = null

let turnedAway: string | null = null

const pageOf = (named: string): string => {
  const [, slug = ""] = named.split("/")
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
      if (named === unnamed) return { refused: `${named} reaches no page` }
      return pageOf(named)
    },
  })
)

mock.module("akasha/alan/harness/readouts/relay/readout-relay.module.code.ts", () => ({
  ...relay,
  carryReadingBeside: (_root: string, _page: string, to: string) => {
    if (to === turnedAway) return Promise.reject(new Error(`${to} answered 503`))
    REACHED.push(to)
    return Promise.resolve(`a reading taken now carried to ${to}`)
  },
}))

const running = await import(
  "akasha/alan/harness/surplus/relay-service/surplus-relay-service.service-workstation.running.code.ts"
)

const ranOnce = async (): Promise<undefined> => {
  ASKED.length = 0
  REACHED.length = 0
  process.env[relay.RELAY_SECRET_NAME] = SECRET
  await running.runService()
  return undefined
}

test("the run takes no argument, because the service runner hands it none", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
})

test("the run is all this file offers, so the service has a single way in", () => {
  expect(Object.keys(running)).toEqual(["runService"])
})

test("a run carries the surplus reading to both sites that show the surplus", async () => {
  unnamed = null
  turnedAway = null
  await ranOnce()
  expect(REACHED).toEqual(SITES)
})

test("the readout is reached under its own name rather than under a spelled path", async () => {
  unnamed = null
  turnedAway = null
  await ranOnce()
  expect(ASKED).toEqual([POINT])
})

test("a carry that fails to one site does not stop the carry to the other site", async () => {
  unnamed = null
  turnedAway = SITES[1] ?? null
  await ranOnce()
  expect(REACHED).toEqual(SITES.filter((one) => one !== turnedAway))
})

test("a readout the index reaches no page for costs every carry rather than throwing", async () => {
  unnamed = POINT
  turnedAway = null
  await ranOnce()
  expect(REACHED).toEqual([])
})

test("a run given no relay secret throws rather than carrying nothing in silence", async () => {
  unnamed = null
  turnedAway = null
  REACHED.length = 0
  delete process.env[relay.RELAY_SECRET_NAME]
  await expect(running.runService()).rejects.toThrow(relay.RELAY_SECRET_NAME)
  expect(REACHED).toEqual([])
})
