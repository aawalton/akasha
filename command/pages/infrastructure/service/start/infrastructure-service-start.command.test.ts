import { expect, test } from "bun:test"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { infrastructureServiceStart } from "akasha/command/pages/infrastructure/service/start/infrastructure-service-start.command.code.ts"

const HERE: Given = {
  root: process.cwd(),
  calledAs: "akasha infrastructure service start",
  from: process.cwd(),
  writer: null,
  agentId: null,
}

test("a call naming no service is refused as the caller's fault", () => {
  const answer = infrastructureServiceStart([], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("<slug>")
  expect(answer.refusals[0]).toContain("nothing said it")
})

test("every service is nothing this takes", () => {
  const answer = infrastructureServiceStart(["one", "--all"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("`--all`")
})

test("a call naming two services is refused rather than chosen between", () => {
  const answer = infrastructureServiceStart(["one", "two"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("takes 1 word")
})

test("a slug no page carries is the caller's mistake", () => {
  const answer = infrastructureServiceStart(["no-such-service-is-here"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("no-such-service-is-here")
})
