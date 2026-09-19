import { expect, test } from "bun:test"
import {
  IN_CLUSTER,
  IN_CLUSTER_SET,
  inCluster,
  NODE_NAME,
  nodeNamed,
} from "akasha/infrastructure/job/modules/run-in-cluster/run-in-cluster.module.code.ts"

const NODE = "node-05"

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

test("the node a run landed on is known by what the pod states in its environment", () => {
  process.env[NODE_NAME] = NODE
  expect(nodeNamed()).toBe(NODE)
  delete process.env[NODE_NAME]
})

test("a run whose environment names no node is answered with no node", () => {
  delete process.env[NODE_NAME]
  expect(nodeNamed()).toBe(null)
  process.env[NODE_NAME] = ""
  expect(nodeNamed()).toBe(null)
  delete process.env[NODE_NAME]
})
