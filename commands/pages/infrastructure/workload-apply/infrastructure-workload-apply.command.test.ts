import { afterAll, expect, test } from "bun:test"
import { seededWorld } from "../../../../infrastructure/cluster/services/web-app-reading/web-app-reading.module.test-fixtures.ts"
import type { Given } from "../../../modules/calling/calling.module.code.ts"
import {
  infrastructureWorkloadApply,
  servableNamed,
} from "./infrastructure-workload-apply.command.code.ts"

const WORLD = seededWorld()

afterAll(() => {
  WORLD.sweep()
})

const HERE: Given = {
  root: WORLD.root,
  calledAs: "akasha infrastructure workload-apply",
  from: WORLD.root,
  writer: null,
  agentId: null,
}

test("a call naming no cluster service is refused as the caller's fault", async () => {
  const answer = await infrastructureWorkloadApply([], HERE)

  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("name the cluster service")
})

test("a call naming two cluster services is refused rather than chosen between", async () => {
  const answer = await infrastructureWorkloadApply(["one", "two"], HERE)

  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("one cluster service")
  expect(answer.refusals[0]).toContain("one, two")
})

test("a flag this command does not take is refused by name", async () => {
  const answer = await infrastructureWorkloadApply(["headscale", "--again"], HERE)

  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("`--again`")
})

test("a slug no cluster service page carries is refused as the data's fault", async () => {
  const answer = await infrastructureWorkloadApply(["no-such-service-here"], HERE)

  expect(answer.code).toBe(2)
  expect(answer.refusals[0]).toContain("no-such-service-here")
})

test("a refusal reaching no cluster reports nothing about a workload", async () => {
  const answer = await infrastructureWorkloadApply(["no-such-service-here"], HERE)

  expect(answer.report).toEqual([])
})

test("a slug no cluster service page carries is read as no workload", () => {
  const read = servableNamed(WORLD.root, "no-such-service-here")

  expect(read).toHaveProperty("refused")
})
