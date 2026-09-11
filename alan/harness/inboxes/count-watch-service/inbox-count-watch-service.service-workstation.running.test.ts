import { expect, mock, test } from "bun:test"

const SETTLED = "settled"
const TAKING_ON = "taking on"
const SITE = "https://alanwalton.com"
const UNFOLLOWED = "the index folder could not be followed"
const HANDED: string[] = []

const watching = await import(
  "akasha/alan/harness/inboxes/count-watch/inbox-count-watch.module.code.ts"
)

mock.module("akasha/alan/harness/inboxes/count-watch/inbox-count-watch.module.code.ts", () => ({
  ...watching,
  runInboxCountWatch: (to: string) => {
    HANDED.push(to)
    return () => undefined
  },
}))

const running = await import(
  "akasha/alan/harness/inboxes/count-watch-service/inbox-count-watch-service.service-workstation.running.code.ts"
)

function outcomeOf(run: Promise<never>, ms: number): Promise<string> {
  return Promise.race([
    run.then(() => SETTLED),
    new Promise<string>((say) => {
      setTimeout(() => say(TAKING_ON), ms)
    }),
  ])
}

test("the run is a function taking nothing, which is how the service runner calls it", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
})

test("the run is the only way into this file, so the service has one entry", () => {
  expect(Object.keys(running)).toEqual(["runService"])
})

test("a run starts the watch module's own watch rather than a watch written again here", async () => {
  HANDED.length = 0
  await expect(outcomeOf(running.runService(), 25)).resolves.toBe(TAKING_ON)
  expect(HANDED).toEqual([SITE])
})

test("the run is handed the site the unit's command line spells the counts are carried to", async () => {
  HANDED.length = 0
  await expect(outcomeOf(running.runService(), 25)).resolves.toBe(TAKING_ON)
  expect(HANDED[0]).toBe(SITE)
})

test("a run does not answer while the counts are watched, so the runner's process stays the service", async () => {
  HANDED.length = 0
  await expect(outcomeOf(running.runService(), 100)).resolves.toBe(TAKING_ON)
})

test("a watch that could not start is carried out rather than swallowed, so a failed start is a failed unit", async () => {
  mock.module("akasha/alan/harness/inboxes/count-watch/inbox-count-watch.module.code.ts", () => ({
    ...watching,
    runInboxCountWatch: () => {
      throw new Error(UNFOLLOWED)
    },
  }))
  await expect(running.runService()).rejects.toThrow(UNFOLLOWED)
})
