import { expect, mock, test } from "bun:test"

const RAN: string[] = []

const sweeping = await import(
  "akasha/infrastructure/cluster/manifests/orphan-sweeping/orphan-sweeping.module.code.ts"
)

mock.module(
  "akasha/infrastructure/cluster/manifests/orphan-sweeping/orphan-sweeping.module.code.ts",
  () => ({
    ...sweeping,
    runOrphanSweeping: () => {
      RAN.push("sweep")
      return Promise.resolve()
    },
  })
)

const running = await import(
  "akasha/infrastructure/services/workstations/pages/orphaned-resources-sweep.service-workstation.running.code.ts"
)

test("the run is a function taking nothing, which is how the service runner calls it", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
})

test("the run is the only way into this file, so the service has one entry", () => {
  expect(Object.keys(running)).toEqual(["runService"])
})

test("a run turns the sweeping module's own sweep rather than a sweep written again here", async () => {
  RAN.length = 0
  await running.runService()
  expect(RAN).toEqual(["sweep"])
})

test("a sweep that could not run is carried out rather than swallowed", async () => {
  RAN.length = 0
  const why = new Error("the sweep could not run")
  mock.module(
    "akasha/infrastructure/cluster/manifests/orphan-sweeping/orphan-sweeping.module.code.ts",
    () => ({
      ...sweeping,
      runOrphanSweeping: () => Promise.reject(why),
    })
  )
  await expect(running.runService()).rejects.toThrow("the sweep could not run")
})
