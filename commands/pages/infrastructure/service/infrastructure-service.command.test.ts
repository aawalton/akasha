import { expect, test } from "bun:test"
import type { Given } from "../../../modules/calling/calling.module.code.ts"
import { infrastructureService } from "./infrastructure-service.command.code.ts"

function given(root: string): Given {
  return {
    root,
    calledAs: "akasha infrastructure service",
    from: root,
    writer: null,
    agentId: null,
  }
}

const HERE = given(process.cwd())

test("a call naming no act is refused as the caller's fault", () => {
  const answer = infrastructureService([], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("install")
})

test("an act this command does not carry is refused by name", () => {
  const answer = infrastructureService(["uninstall"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("`uninstall`")
})

test("naming no service and not saying every one is refused", () => {
  const answer = infrastructureService(["install"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("--all")
})

test("naming a service beside every service is refused", () => {
  const answer = infrastructureService(["install", "pages-service", "--all"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("two things")
})

test("naming two services is refused", () => {
  const answer = infrastructureService(["install", "one", "two"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("one service at a time")
})

test("a flag this command does not take is refused by name", () => {
  const answer = infrastructureService(["install", "--apply"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("`--apply`")
})

test("a slug no service page carries is refused as the data's fault", () => {
  const answer = infrastructureService(["install", "no-such-service-is-here", "--dry-run"], HERE)
  expect(answer.code).toBe(2)
  expect(answer.refusals[0]).toContain("no-such-service-is-here")
})

test("a dry run reports the plan and writes nothing", () => {
  const answer = infrastructureService(["install", "pages-service", "--dry-run"], HERE)
  expect(answer.code).toBe(0)
  expect(answer.refusals).toEqual([])
  expect(answer.report).toContain("write\tpages-service.service")
  expect(answer.report).toContain("enable\tpages-service.service")
  expect(answer.report[answer.report.length - 1]).toContain("dry-run")
})

test("a dry run naming one service plans nothing for any other", () => {
  const answer = infrastructureService(["install", "pages-service", "--dry-run"], HERE)
  for (const line of answer.report) expect(line).not.toContain("remove\t")
})

test("an act asking systemd for no named service is refused as the caller's fault", () => {
  const answer = infrastructureService(["restart"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("name the service to restart")
})

test("an act asking systemd for two services is refused", () => {
  const answer = infrastructureService(["stop", "one", "two"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("one service at a time")
})

test("every service is nothing an act asking systemd takes", () => {
  const answer = infrastructureService(["start", "one", "--all"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("`--all`")
})

test("an act asking systemd for a slug no page carries is the data's fault", () => {
  const answer = infrastructureService(["restart", "no-such-service-is-here"], HERE)
  expect(answer.code).toBe(2)
  expect(answer.refusals[0]).toContain("no-such-service-is-here")
})

test("a dry run names the unit systemd would be asked about and asks nothing", () => {
  const answer = infrastructureService(["restart", "pages-service", "--dry-run"], HERE)
  expect(answer.code).toBe(0)
  expect(answer.refusals).toEqual([])
  expect(answer.report[0]).toBe("restart\tpages-service.service")
  expect(answer.report[answer.report.length - 1]).toContain("dry-run")
})
