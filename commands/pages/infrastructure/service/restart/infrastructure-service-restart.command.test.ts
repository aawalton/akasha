import { expect, test } from "bun:test"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { infrastructureServiceRestart } from "akasha/commands/pages/infrastructure/service/restart/infrastructure-service-restart.command.code.ts"

const HERE: Given = {
  root: process.cwd(),
  calledAs: "akasha infrastructure service restart",
  from: process.cwd(),
  writer: null,
  agentId: null,
}

test("a call naming no service is refused as the caller's fault", () => {
  const answer = infrastructureServiceRestart([], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("<slug>")
  expect(answer.refusals[0]).toContain("nothing said it")
})

test("a flag this does not take is refused by name", () => {
  const answer = infrastructureServiceRestart(["one", "--all"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("`--all`")
})

test("a call naming two services is refused rather than chosen between", () => {
  const answer = infrastructureServiceRestart(["one", "two"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("takes 1 word")
})

test("a slug no page carries is the caller's mistake", () => {
  const answer = infrastructureServiceRestart(["no-such-service-is-here"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("no-such-service-is-here")
})

test("a dry run names the unit systemd would be asked about and asks nothing", () => {
  const answer = infrastructureServiceRestart(["pages-service", "--dry-run"], HERE)
  expect(answer.code).toBe(0)
  expect(answer.refusals).toEqual([])
  expect(answer.report[0]).toBe("restart\tpages-service.service")
  expect(answer.report[answer.report.length - 1]).toContain("dry-run")
})
