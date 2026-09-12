import { expect, mock, test } from "bun:test"

const HANDED: string[][] = []

const binaryRunning = await import(
  "akasha/infrastructure/services/workstations/binary-running/binary-running.module.code.ts"
)

mock.module(
  "akasha/infrastructure/services/workstations/binary-running/binary-running.module.code.ts",
  () => ({
    ...binaryRunning,
    runBinary: (argv: readonly string[]) => {
      HANDED.push([...argv])
      return Promise.resolve()
    },
  })
)

const running = await import(
  "akasha/infrastructure/services/workstations/pages/dcgm-exporter.service-workstation.running.code.ts"
)

test("the run is a function taking nothing, which is how the service runner calls it", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
})

test("the run is the only way into this file, so the service has one entry", () => {
  expect(Object.keys(running)).toEqual(["runService"])
})

test("a run hands the binary runner the program and the arguments rather than a command line", async () => {
  HANDED.length = 0
  await running.runService()
  expect(HANDED).toEqual([
    [
      "/usr/bin/podman",
      "run",
      "--rm",
      "--replace",
      "--name",
      "dcgm-exporter",
      "--device",
      "nvidia.com/gpu=all",
      "-p",
      "9400:9400",
      "nvcr.io/nvidia/k8s/dcgm-exporter:3.3.8-3.6.0-ubuntu22.04",
    ],
  ])
})

test("the run spawns nothing of its own, so the binary runner is the only way out", async () => {
  HANDED.length = 0
  await running.runService()
  expect(HANDED.length).toBe(1)
})
