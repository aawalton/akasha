import { expect, mock, test } from "bun:test"

const SECRET = "a-safety-relay-secret-standing-in-for-the-machine-one"

const POINT = "readout/upkeep-safety"

const PAGE = "a-checkout/wherever-the-index-says/upkeep-safety.readout.ts"

const ALANS_SITE = "https://alanwalton.com"

const JENNYS_SITE = "https://smilingjenny.me"

const asked: string[] = []

const reached: string[] = []

let nameless = false

let answeringBadly: string | null = null

const relay = await import("akasha/alan/harness/readouts/relay/readout-relay.module.code.ts")

const composing = await import(
  "akasha/infrastructure/services/workstations/run-composing/run-composing.module.code.ts"
)

mock.module(
  "akasha/infrastructure/services/workstations/run-composing/run-composing.module.code.ts",
  () => ({
    ...composing,
    pathOf: (_root: string, named: string) => {
      asked.push(named)
      return nameless ? { refused: `${named} names no page` } : PAGE
    },
  })
)

mock.module("akasha/alan/harness/readouts/relay/readout-relay.module.code.ts", () => ({
  ...relay,
  carryReadingBeside: (_root: string, _page: string, to: string) => {
    if (to === answeringBadly) return Promise.reject(new Error(`${to} answered 500`))
    reached.push(to)
    return Promise.resolve(`a reading taken now carried to ${to}`)
  },
}))

const running = await import(
  "akasha/alan/harness/safety/relay-service/safety-relay-service.service-workstation.running.code.ts"
)

const sitesReachedAfter = async (arranging: () => undefined): Promise<readonly string[]> => {
  asked.length = 0
  reached.length = 0
  nameless = false
  answeringBadly = null
  arranging()
  process.env[relay.RELAY_SECRET_NAME] = SECRET
  await running.runService()
  return reached
}

const arrangingNothing = (): undefined => undefined

test("the run is a function taking nothing, which is how the service runner calls it", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
})

test("the run is all this file hands out, so the service has one way in", () => {
  expect(Object.keys(running)).toEqual(["runService"])
})

test("a run carries the safety level to both sites showing it", async () => {
  expect(await sitesReachedAfter(arrangingNothing)).toEqual([ALANS_SITE, JENNYS_SITE])
})

test("the readout is reached by the name the index answers for", async () => {
  await sitesReachedAfter(arrangingNothing)
  expect(asked).toEqual([POINT])
})

test("a carry that fails to one site does not stop the carry to the other", async () => {
  const after = await sitesReachedAfter((): undefined => {
    answeringBadly = ALANS_SITE
    return undefined
  })
  expect(after).toEqual([JENNYS_SITE])
})

test("a readout the index names no page for costs the carries rather than throwing", async () => {
  const after = await sitesReachedAfter((): undefined => {
    nameless = true
    return undefined
  })
  expect(after).toEqual([])
})

test("a run with no relay secret stated refuses rather than carrying nothing quietly", async () => {
  reached.length = 0
  delete process.env[relay.RELAY_SECRET_NAME]
  await expect(running.runService()).rejects.toThrow(relay.RELAY_SECRET_NAME)
  expect(reached).toEqual([])
})
