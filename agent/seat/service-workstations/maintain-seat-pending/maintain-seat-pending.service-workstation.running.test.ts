import { expect, mock, test } from "bun:test"
import {
  FOLLOWING_ON,
  outcomeOf,
} from "akasha/infrastructure/service/workstation/modules/run-outcome/run-outcome.module.code.ts"

const HANDED: (readonly string[])[] = []

const maintaining = await import(
  "akasha/agent/seat/observation/seat-turn/seat-pending/modules/pending-maintaining/pending-maintaining.module.code.ts"
)

mock.module(
  "akasha/agent/seat/observation/seat-turn/seat-pending/modules/pending-maintaining/pending-maintaining.module.code.ts",
  () => ({
    ...maintaining,
    runPendingMaintaining: (argv: readonly string[]) => {
      HANDED.push(argv)
      return 0
    },
  })
)

const running = await import(
  "akasha/agent/seat/service-workstations/maintain-seat-pending/maintain-seat-pending.service-workstation.running.code.ts"
)

test("the run is a function taking nothing, which is how the service runner calls it", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
})

test("the run is the only way into this file, so the service has one entry", () => {
  expect(Object.keys(running)).toEqual(["runService"])
})

test("a run starts the maintaining module's own run rather than a run written again here", async () => {
  HANDED.length = 0
  await expect(outcomeOf(running.runService(), 25)).resolves.toBe(FOLLOWING_ON)
  expect(HANDED).toEqual([[]])
})

test("the run is handed the words the unit's command line spells, which is none of them", async () => {
  HANDED.length = 0
  await expect(outcomeOf(running.runService(), 25)).resolves.toBe(FOLLOWING_ON)
  expect(HANDED[0]).toEqual([])
})

test("a run does not answer while the folders are followed, so the runner's process stays the service", async () => {
  HANDED.length = 0
  await expect(outcomeOf(running.runService(), 100)).resolves.toBe(FOLLOWING_ON)
})

test("a start that could not be taken is carried out rather than swallowed, so a failed start is a failed unit", async () => {
  mock.module(
    "akasha/agent/seat/observation/seat-turn/seat-pending/modules/pending-maintaining/pending-maintaining.module.code.ts",
    () => ({
      ...maintaining,
      runPendingMaintaining: () => {
        throw new Error("the seat stores could not be reached")
      },
    })
  )
  await expect(running.runService()).rejects.toThrow("the seat stores could not be reached")
})
