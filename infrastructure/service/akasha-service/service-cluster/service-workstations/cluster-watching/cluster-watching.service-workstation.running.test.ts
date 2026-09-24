import { expect, mock, test } from "bun:test"

const RAN: string[] = []

const watching = await import(
  "akasha/infrastructure/service/akasha-service/service-cluster/modules/cluster-watching/cluster-watching.module.code.ts"
)

mock.module(
  "akasha/infrastructure/service/akasha-service/service-cluster/modules/cluster-watching/cluster-watching.module.code.ts",
  () => ({
    ...watching,
    runClusterWatching: () => {
      RAN.push("watch")
    },
  })
)

const running = await import(
  "akasha/infrastructure/service/akasha-service/service-cluster/service-workstations/cluster-watching/cluster-watching.service-workstation.running.code.ts"
)

test("the run is a function taking nothing, which is how the service runner calls it", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
})

test("the run is the only way into this file, so the service has one entry", () => {
  expect(Object.keys(running)).toEqual(["runService"])
})

test("a run turns the watching module's own round rather than a round written again here", async () => {
  RAN.length = 0
  await running.runService()
  expect(RAN).toEqual(["watch"])
})

test("a round that could not read the cluster is carried out rather than swallowed, so a failed run is a failed unit", async () => {
  const why = new Error("cluster-watching: the cluster could not be read, so nothing is judged")
  mock.module(
    "akasha/infrastructure/service/akasha-service/service-cluster/modules/cluster-watching/cluster-watching.module.code.ts",
    () => ({
      ...watching,
      runClusterWatching: () => {
        throw why
      },
    })
  )
  await expect(running.runService()).rejects.toThrow("could not be read")
})
