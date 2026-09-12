import { expect, mock, test } from "bun:test"

const HANDED: (readonly unknown[])[] = []

const rebuilding = await import(
  "akasha/alan/harness/persona-points-rebuilding/persona-points-rebuilding.module.code.ts"
)

mock.module(
  "akasha/alan/harness/persona-points-rebuilding/persona-points-rebuilding.module.code.ts",
  () => ({
    ...rebuilding,
    runPersonaPointsRebuilding: (...given: readonly unknown[]) => {
      HANDED.push(given)
      return undefined
    },
  })
)

const running = await import(
  "akasha/infrastructure/services/workstations/pages/persona-points-rebuilding.service-workstation.running.code.ts"
)

test("the run can be called with nothing, which is how the unit's command line calls it", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
})

test("the run is the only way into this file, so the service has one entry", () => {
  expect(Object.keys(running)).toEqual(["runService"])
})

test("a run turns the rebuilding module's own rebuild rather than a rebuild written again here", () => {
  HANDED.length = 0
  running.runService()
  expect(HANDED.length).toBe(1)
})

test("the rebuild is handed the list the run was handed, so what it rebuilt can be named", () => {
  HANDED.length = 0
  const done: string[] = []
  running.runService(done)
  expect(HANDED).toEqual([[done]])
})

test("a run handed no list hands a list of its own, so the rebuild has somewhere to name into", () => {
  HANDED.length = 0
  running.runService()
  expect(HANDED).toEqual([[[]]])
})

test("a rebuild that was done hands nothing back, so the run ends of its own accord", () => {
  HANDED.length = 0
  expect(running.runService()).toBeUndefined()
})

test("a rebuild that could not run is carried out rather than swallowed, so a failed run is a failed unit", () => {
  const why = new Error("the persona points could not be written")
  mock.module(
    "akasha/alan/harness/persona-points-rebuilding/persona-points-rebuilding.module.code.ts",
    () => ({
      ...rebuilding,
      runPersonaPointsRebuilding: () => {
        throw why
      },
    })
  )
  expect(() => running.runService()).toThrow("the persona points could not be written")
})
