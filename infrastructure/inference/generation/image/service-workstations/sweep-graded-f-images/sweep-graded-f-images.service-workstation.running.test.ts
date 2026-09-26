import { expect, mock, test } from "bun:test"

const HANDED: (readonly string[])[] = []

const sweeping = await import(
  "akasha/infrastructure/inference/generation/image/modules/graded-f-sweeping/graded-f-sweeping.module.code.ts"
)

mock.module(
  "akasha/infrastructure/inference/generation/image/modules/graded-f-sweeping/graded-f-sweeping.module.code.ts",
  () => ({
    ...sweeping,
    sweepGradedF: (argv: readonly string[]) => {
      HANDED.push(argv)
      return Promise.resolve(0)
    },
  })
)

const running = await import(
  "akasha/infrastructure/inference/generation/image/service-workstations/sweep-graded-f-images/sweep-graded-f-images.service-workstation.running.code.ts"
)

test("the run is a function taking nothing, which is how the service runner calls it", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
})

test("the run is the only way into this file, so the service has one entry", () => {
  expect(Object.keys(running)).toEqual(["runService"])
})

test("a run turns the sweeping module's own sweep, asked to remove", async () => {
  HANDED.length = 0
  await running.runService()
  expect(HANDED).toEqual([["--remove"]])
})
