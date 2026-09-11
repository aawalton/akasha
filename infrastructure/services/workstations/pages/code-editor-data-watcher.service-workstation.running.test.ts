import { expect, mock, test } from "bun:test"

const SETTLED = "settled"
const WATCHING_ON = "watching on"
const RAN: string[] = []

const watching = await import(
  "akasha/alan/harness/code-editor/data-interfaces/data-watching/data-watching.module.code.ts"
)

mock.module(
  "akasha/alan/harness/code-editor/data-interfaces/data-watching/data-watching.module.code.ts",
  () => ({
    ...watching,
    watchEditorData: () => {
      RAN.push("watch")
      return () => undefined
    },
  })
)

const running = await import(
  "akasha/infrastructure/services/workstations/pages/code-editor-data-watcher.service-workstation.running.code.ts"
)

function outcomeOf(run: Promise<never>, ms: number): Promise<string> {
  return Promise.race([
    run.then(() => SETTLED),
    new Promise<string>((say) => {
      setTimeout(() => say(WATCHING_ON), ms)
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

test("a run starts the watching module's own watch rather than a watch written again here", async () => {
  RAN.length = 0
  await expect(outcomeOf(running.runService(), 25)).resolves.toBe(WATCHING_ON)
  expect(RAN).toEqual(["watch"])
})

test("a run does not answer while the watch is up, so the runner's process stays the service", async () => {
  RAN.length = 0
  await expect(outcomeOf(running.runService(), 100)).resolves.toBe(WATCHING_ON)
})

test("a watch that could not start is carried out rather than swallowed, so a failed start is a failed unit", async () => {
  mock.module(
    "akasha/alan/harness/code-editor/data-interfaces/data-watching/data-watching.module.code.ts",
    () => ({
      ...watching,
      watchEditorData: () => {
        throw new Error("the editor's folders could not be watched")
      },
    })
  )
  await expect(running.runService()).rejects.toThrow("the editor's folders could not be watched")
})
