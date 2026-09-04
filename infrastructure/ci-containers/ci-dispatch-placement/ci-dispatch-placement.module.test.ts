import { expect, test } from "bun:test"
import type {
  Candidate,
  NodeCapacity,
} from "../ci-dispatch-shapes/ci-dispatch-shapes.module.code.ts"
import {
  CI_RESERVED_NODE,
  MAIN_BRANCH,
  NEVER_FIT_PERSIST_MS,
  onMainBranch,
  selectNext,
} from "./ci-dispatch-placement.module.code.ts"

const NOW = 10_000_000

/** Room left this tick, and — where they differ — the ceiling the node could ever offer. */
function node(nodeName: string, cpu: number, mem: number, ceiling?: number): NodeCapacity {
  return {
    nodeName,
    cpuMillisAvailable: cpu,
    memoryBytesAvailable: mem,
    cpuMillisCapacity: ceiling ?? cpu,
    memoryBytesCapacity: ceiling ?? mem,
  }
}

function step(over: Partial<Candidate>): Candidate {
  return {
    stepSeq: "1",
    stepName: "build",
    dependsOn: [],
    workflowSeq: "1",
    workflowSlug: "checks",
    workflowKind: "check",
    workflowStatus: "running",
    pipelineSeq: "1",
    pipelineStatus: "running",
    pipelineBranch: "topic",
    pipelineCommit: "abc",
    pipelineInstructionsCommit: "def",
    inputsHash: null,
    assignedNode: null,
    definition: {},
    requests: { cpuMillis: 100, memoryBytes: 512 },
    pipelineMaxRequests: { cpuMillis: 100, memoryBytes: 512 },
    dispatchWaitSince: null,
    neverFitSince: null,
    ...over,
  }
}

const options = { now: NOW, stickyPinning: true }

test("main is the branch the reserved node is held for", () => {
  expect(onMainBranch(MAIN_BRANCH)).toBe(true)
  expect(onMainBranch("topic")).toBe(false)
})

test("a step under a pipeline that has reached its verdict is placed nowhere", () => {
  const decision = selectNext(
    [step({ pipelineStatus: "passed" })],
    [node("node-01", 8000, 99999)],
    options
  )
  expect(decision.toCreate).toEqual([])
  expect(decision.toSkipTerminalAncestor.length).toBe(1)
})

test("a step under a workflow that has reached its verdict is placed nowhere", () => {
  const decision = selectNext(
    [step({ workflowStatus: "skipped" })],
    [node("node-01", 8000, 99999)],
    options
  )
  expect(decision.toCreate).toEqual([])
  expect(decision.toSkipTerminalAncestor.length).toBe(1)
})

test("a step on main is placed on the reserved ci node", () => {
  const decision = selectNext(
    [step({ pipelineBranch: MAIN_BRANCH })],
    [node("node-01", 8000, 99999), node(CI_RESERVED_NODE, 8000, 99999)],
    options
  )
  expect(decision.toCreate[0]?.node).toBe(CI_RESERVED_NODE)
})

test("a branch pipeline's steps all take the node its first step took", () => {
  const decision = selectNext(
    [step({ stepSeq: "1" }), step({ stepSeq: "2" })],
    [node("node-01", 8000, 99999), node("node-02", 400, 99999)],
    options
  )
  expect(decision.toCreate.length).toBe(2)
  expect(decision.toCreate[0]?.node).toBe(decision.toCreate[1]?.node)
  expect(decision.toCreate[0]?.newAssignment).toBe(true)
  expect(decision.toCreate[1]?.newAssignment).toBe(false)
})

test("a step bound to a node that is full this tick but could hold it defers", () => {
  const decision = selectNext(
    [step({ assignedNode: "node-01" })],
    [node("node-01", 0, 0, 99999)],
    options
  )
  expect(decision.toCreate).toEqual([])
  expect(decision.toDefer[0]?.node).toBe("node-01")
})

test("a step bound to a node that could never hold it is never-fit rather than deferred", () => {
  const decision = selectNext([step({ assignedNode: "node-01" })], [node("node-01", 0, 0)], options)
  expect(decision.toDefer).toEqual([])
  expect(decision.toNeverFitWait.length).toBe(1)
})

test("a step asking past every node's ceiling waits before it is failed", () => {
  const big = { cpuMillis: 100, memoryBytes: 1 << 30 }
  const asked = step({ requests: big, pipelineMaxRequests: big })
  const nodes = [node("node-01", 8000, 4096)]
  expect(selectNext([asked], nodes, options).toNeverFitWait.length).toBe(1)
  const stood = step({ ...asked, neverFitSince: NOW - NEVER_FIT_PERSIST_MS })
  expect(selectNext([stood], nodes, options).toFail.length).toBe(1)
})

test("an unbound step every node could hold but none can this tick holds for room", () => {
  const decision = selectNext([step({})], [node("node-01", 0, 0, 99999)], options)
  expect(decision.toHeldNoCapacity.length).toBe(1)
  expect(decision.toFail).toEqual([])
  expect(decision.toNeverFitWait).toEqual([])
})

test("with no node to place on, nothing is admitted", () => {
  expect(selectNext([step({})], [], options).toCreate).toEqual([])
})

test("without sticky pinning a step goes wherever there is the most room", () => {
  const decision = selectNext(
    [step({ pipelineBranch: MAIN_BRANCH })],
    [node("node-01", 8000, 99999), node(CI_RESERVED_NODE, 200, 1024)],
    { now: NOW, stickyPinning: false }
  )
  expect(decision.toCreate[0]?.node).toBe("node-01")
  expect(decision.toCreate[0]?.pinned).toBe(false)
})
