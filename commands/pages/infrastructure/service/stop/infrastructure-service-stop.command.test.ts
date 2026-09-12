import { expect, test } from "bun:test"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { infrastructureServiceStop } from "akasha/commands/pages/infrastructure/service/stop/infrastructure-service-stop.command.code.ts"

const HERE: Given = {
  root: process.cwd(),
  calledAs: "akasha infrastructure service stop",
  from: process.cwd(),
  writer: null,
  agentId: null,
}

test("a call naming no service is refused as the caller's fault", () => {
  const answer = infrastructureServiceStop([], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("<slug>")
  expect(answer.refusals[0]).toContain("nothing said it")
})

test("a flag this does not take is refused by name", () => {
  const answer = infrastructureServiceStop(["one", "--all"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("`--all`")
})

test("a call naming two services is refused rather than chosen between", () => {
  const answer = infrastructureServiceStop(["one", "two"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("takes 1 word")
})

test("a slug no page carries is the caller's mistake", () => {
  const answer = infrastructureServiceStop(["no-such-service-is-here"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("no-such-service-is-here")
})

test("a dry run names the unit systemd would be asked about and asks nothing", () => {
  const answer = infrastructureServiceStop(["pages-service", "--dry-run"], HERE)
  expect(answer.code).toBe(0)
  expect(answer.refusals).toEqual([])
  expect(answer.report[0]).toBe("stop\tpages-service.service")
  expect(answer.report[answer.report.length - 1]).toContain("dry-run")
})
