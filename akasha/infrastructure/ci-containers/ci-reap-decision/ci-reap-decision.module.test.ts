import { expect, test } from "bun:test"
import {
  decideLaunchRefusal,
  isLaunchRefusedReason,
  pipelineSeqFromContainerName,
  shouldReapContainer,
} from "./ci-reap-decision.module.code.ts"

test("a container whose step has reached a verdict is cleared", () => {
  const decision = shouldReapContainer({
    containerName: "pe-7-build-abc1234",
    stepStatus: "passed",
    pipelineStatus: null,
  })
  expect(decision).toEqual({
    reap: true,
    reason: "step-terminal",
    containerName: "pe-7-build-abc1234",
  })
})

test("a container whose step is still running is left alone", () => {
  const decision = shouldReapContainer({
    containerName: "pe-7-build-abc1234",
    stepStatus: "running",
    pipelineStatus: "passed",
  })
  expect(decision.reap).toBe(false)
  expect(decision.reason).toBe("step-non-terminal")
})

test("a container no step names is cleared where its pipeline has reached a verdict", () => {
  const decision = shouldReapContainer({
    containerName: "pe-7-build-abc1234",
    stepStatus: null,
    pipelineStatus: "failed",
  })
  expect(decision.reap).toBe(true)
  expect(decision.reason).toBe("pipeline-terminal-orphan")
})

test("a container no step names under a running pipeline is left alone", () => {
  const decision = shouldReapContainer({
    containerName: "pe-7-build-abc1234",
    stepStatus: null,
    pipelineStatus: "running",
  })
  expect(decision.reap).toBe(false)
  expect(decision.reason).toBe("orphan-pipeline-running")
})

test("a container whose name carries no pipeline sequence was launched elsewhere", () => {
  const decision = shouldReapContainer({
    containerName: "grafana-7c9f",
    stepStatus: null,
    pipelineStatus: "failed",
  })
  expect(decision.reap).toBe(false)
  expect(decision.reason).toBe("no-step-out-of-band")
})

test("the pipeline sequence is read back out of the name the dispatcher built", () => {
  expect(pipelineSeqFromContainerName("pe-42-run-checks-0123456")).toBe("42")
  expect(pipelineSeqFromContainerName("pe-42-")).toBe(null)
  expect(pipelineSeqFromContainerName("node-exporter-abc")).toBe(null)
})

test("only an OutOf reason on a launching step is a refused launch", () => {
  expect(isLaunchRefusedReason("OutOfmemory")).toBe(true)
  expect(isLaunchRefusedReason("Evicted")).toBe(false)
  expect(
    decideLaunchRefusal({ stepStatus: "launching", phase: "Failed", containerReason: "OutOfcpu" })
  ).toEqual({ mark: true, reason: "OutOfcpu" })
  expect(
    decideLaunchRefusal({ stepStatus: "running", phase: "Failed", containerReason: "OutOfcpu" })
  ).toEqual({ mark: false })
  expect(
    decideLaunchRefusal({ stepStatus: "launching", phase: "Failed", containerReason: "Evicted" })
  ).toEqual({ mark: false })
})
