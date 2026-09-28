import { expect, mock, test } from "bun:test"

const HANDED: boolean[] = []

const writing = await import(
  "akasha/story/world/stories/written/modules/nightly-chapter-writing/nightly-chapter-writing.module.code.ts"
)

mock.module(
  "akasha/story/world/stories/written/modules/nightly-chapter-writing/nightly-chapter-writing.module.code.ts",
  () => ({
    ...writing,
    nightlyChapterWriting: (dry: boolean) => {
      HANDED.push(dry)
      return Promise.resolve([])
    },
  })
)

const running = await import(
  "akasha/story/world/stories/written/service-workstations/nightly-chapter-writing/nightly-chapter-writing.service-workstation.running.code.ts"
)

test("the run is a function taking nothing, which is how the service runner calls it", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
})

test("the run is the only way into this file, so the service has one entry", () => {
  expect(Object.keys(running)).toEqual(["runService"])
})

test("a run turns the module's own writing, and writes rather than dry-runs", async () => {
  HANDED.length = 0
  await running.runService()
  expect(HANDED).toEqual([false])
})

test("a run that could not ask is carried out rather than swallowed, so a failed run is a failed unit", async () => {
  const why = new Error("the pages service could not be reached")
  mock.module(
    "akasha/story/world/stories/written/modules/nightly-chapter-writing/nightly-chapter-writing.module.code.ts",
    () => ({
      ...writing,
      nightlyChapterWriting: () => Promise.reject(why),
    })
  )
  await expect(running.runService()).rejects.toThrow("the pages service could not be reached")
})
