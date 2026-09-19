import { expect, mock, test } from "bun:test"
import {
  FOLLOWING_ON,
  outcomeOf,
} from "akasha/infrastructure/service/workstation/modules/run-outcome/run-outcome.module.code.ts"

const ROUNDS: number[] = []

const sweeping = await import(
  "akasha/agent/seat/stopping/modules/absent-sweeping/absent-sweeping.module.code.ts"
)

mock.module(
  "akasha/agent/seat/stopping/modules/absent-sweeping/absent-sweeping.module.code.ts",
  () => ({
    ...sweeping,
    sweepAbsentSeats: async (): Promise<readonly string[]> => {
      ROUNDS.push(Date.now())
      return await Promise.resolve([])
    },
  })
)

const running = await import(
  "akasha/agent/seat/service-workstations/sweep-absent-seats/sweep-absent-seats.service-workstation.running.code.ts"
)

test("the run is a function taking nothing, which is how the service runner calls it", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
})

test("the run is the only way into this file, so the service has one entry", () => {
  expect(Object.keys(running)).toEqual(["runService"])
})

test("a round is swept before the run waits, so a seat already gone is ended at once", async () => {
  ROUNDS.length = 0
  await expect(outcomeOf(running.runService(), 25)).resolves.toBe(FOLLOWING_ON)
  expect(ROUNDS.length).toBeGreaterThanOrEqual(1)
})

test("a run does not answer while the rounds go on, so the runner's process is the service", async () => {
  ROUNDS.length = 0
  await expect(outcomeOf(running.runService(), 100)).resolves.toBe(FOLLOWING_ON)
})

test("a round that throws is caught, so one bad round does not end the service", async () => {
  mock.module(
    "akasha/agent/seat/stopping/modules/absent-sweeping/absent-sweeping.module.code.ts",
    () => ({
      ...sweeping,
      sweepAbsentSeats: async (): Promise<readonly string[]> => {
        await Promise.resolve()
        throw new Error("the seat pages could not be read")
      },
    })
  )
  await expect(outcomeOf(running.runService(), 25)).resolves.toBe(FOLLOWING_ON)
})
