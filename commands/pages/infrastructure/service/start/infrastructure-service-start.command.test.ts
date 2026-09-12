import { expect, test } from "bun:test"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { infrastructureServiceStart } from "akasha/commands/pages/infrastructure/service/start/infrastructure-service-start.command.code.ts"

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
  expect(answer.refusals[0]).toContain("name the service")
})

test("every service is nothing this takes", () => {
  const answer = infrastructureServiceStart(["one", "--all"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("`--all`")
})

test("a slug no page carries is the data's fault", () => {
  const answer = infrastructureServiceStart(["no-such-service-is-here"], HERE)
  expect(answer.code).toBe(2)
  expect(answer.refusals[0]).toContain("no-such-service-is-here")
})

test("a dry run names the unit systemd would be asked about and asks nothing", () => {
  const answer = infrastructureServiceStart(["pages-service", "--dry-run"], HERE)
  expect(answer.code).toBe(0)
  expect(answer.refusals).toEqual([])
  expect(answer.report[0]).toBe("start\tpages-service.service")
  expect(answer.report[answer.report.length - 1]).toContain("dry-run")
})
