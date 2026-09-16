import { expect, test } from "bun:test"
import {
  IN_CLUSTER,
  IN_CLUSTER_SET,
  inCluster,
} from "akasha/infrastructure/job/modules/run-in-cluster/run-in-cluster.module.code.ts"

test("a run whose environment states nothing there is not the run in the cluster", () => {
  delete process.env[IN_CLUSTER]
  expect(inCluster()).toBe(false)
  process.env[IN_CLUSTER] = ""
  expect(inCluster()).toBe(false)
  delete process.env[IN_CLUSTER]
})

test("a run in the cluster is known by what the pod states in its environment", () => {
  process.env[IN_CLUSTER] = IN_CLUSTER_SET
  expect(inCluster()).toBe(true)
  delete process.env[IN_CLUSTER]
})
