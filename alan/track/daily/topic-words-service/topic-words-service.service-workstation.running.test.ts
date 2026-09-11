import { expect, mock, test } from "bun:test"

const NOTHING = "neither the wisdom words nor the intelligence topics landed"

let LANDED: readonly string[] = []
let TURNS = 0

const topicWords = await import("akasha/alan/track/daily/topic-words/topic-words.module.code.ts")

mock.module("akasha/alan/track/daily/topic-words/topic-words.module.code.ts", () => ({
  ...topicWords,
  runTopicWords: () => {
    TURNS += 1
    return Promise.resolve(LANDED)
  },
}))

const running = await import(
  "akasha/alan/track/daily/topic-words-service/topic-words-service.service-workstation.running.code.ts"
)

test("the run is a function taking nothing, which is how the service runner calls it", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
})

test("the run is the only way into this file, so the service has one entry", () => {
  expect(Object.keys(running)).toEqual(["runService"])
})

test("a run turns the module's own rollup rather than a rollup written again here", async () => {
  TURNS = 0
  LANDED = ["wisdom words unchanged", "intelligence topics unchanged"]
  await running.runService()
  expect(TURNS).toBe(1)
})

test("a run landing one count of the two answers rather than raising", async () => {
  LANDED = ["wisdom words written"]
  await expect(running.runService()).resolves.toBeUndefined()
})

test("a run landing neither count throws, so the unit fails", async () => {
  LANDED = []
  await expect(running.runService()).rejects.toThrow(NOTHING)
})
