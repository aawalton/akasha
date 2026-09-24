import { expect, test } from "bun:test"
import {
  cpuQuantity,
  memoryQuantity,
  resourcesIn,
  resourcesWith,
} from "akasha/infrastructure/cluster/k8s-type/modules/container-resources/container-resources.module.code.ts"

test("thousandths short of a whole processor are written in thousandths", () => {
  expect(cpuQuantity(100)).toBe("100m")
  expect(cpuQuantity(1500)).toBe("1500m")
})

test("a whole number of processors is written in processors", () => {
  expect(cpuQuantity(1000)).toBe("1")
  expect(cpuQuantity(30000)).toBe("30")
})

test("megabytes are written in gigabytes only where they make a whole gigabyte", () => {
  expect(memoryQuantity(512)).toBe("512Mi")
  expect(memoryQuantity(2048)).toBe("2Gi")
})

test("each value the page states is written where Kubernetes reads it", () => {
  expect(
    resourcesIn({
      minCpuMillicores: 100,
      maxCpuMillicores: 500,
      minMemoryMb: 1024,
      killMemoryMb: 1024,
    })
  ).toEqual({
    requests: { cpu: "100m", memory: "1Gi" },
    limits: { cpu: "500m", memory: "1Gi" },
  })
})

test("a resource asked for beside the page's values is asked for and held to alike", () => {
  const held = resourcesIn({ minCpuMillicores: 1000, maxCpuMillicores: 4000 })
  expect(resourcesWith(held, { "nvidia.com/gpu": "1" })).toEqual({
    requests: { cpu: "1", "nvidia.com/gpu": "1" },
    limits: { cpu: "4", "nvidia.com/gpu": "1" },
  })
})

test("a value the page does not state is left out", () => {
  expect(resourcesIn({ minCpuMillicores: 30, minMemoryMb: 256, killMemoryMb: 256 })).toEqual({
    requests: { cpu: "30m", memory: "256Mi" },
    limits: { memory: "256Mi" },
  })
})
