import { expect, test } from "bun:test"
import type { Given } from "../../command-system/calling/calling.module.code.ts"
import { service } from "./service.command.code.ts"

function given(root: string): Given {
  return { root, calledAs: "akasha service", from: root, writer: null, agentId: null }
}

const HERE = given(process.cwd())

test("a call naming no act is refused as the caller's fault", () => {
  const answer = service([], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("install")
})

test("an act this command does not carry is refused by name", () => {
  const answer = service(["uninstall"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("`uninstall`")
})

test("naming no service and not saying every one is refused", () => {
  const answer = service(["install"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("--all")
})

test("naming a service beside every service is refused", () => {
  const answer = service(["install", "pages-system-service", "--all"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("two things")
})

test("naming two services is refused", () => {
  const answer = service(["install", "one", "two"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("one service at a time")
})

test("a flag this command does not take is refused by name", () => {
  const answer = service(["install", "--apply"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("`--apply`")
})

test("a slug no service page carries is refused as the data's fault", () => {
  const answer = service(["install", "no-such-service-stands-here", "--dry-run"], HERE)
  expect(answer.code).toBe(2)
  expect(answer.refusals[0]).toContain("no-such-service-stands-here")
})

test("a dry run reports the plan and writes nothing", () => {
  const answer = service(["install", "pages-system-service", "--dry-run"], HERE)
  expect(answer.code).toBe(0)
  expect(answer.refusals).toEqual([])
  expect(answer.report).toContain("write\tpages-system-service.service")
  expect(answer.report).toContain("enable\tpages-system-service.service")
  expect(answer.report[answer.report.length - 1]).toContain("dry-run")
})

test("a dry run naming one service plans nothing for any other", () => {
  const answer = service(["install", "pages-system-service", "--dry-run"], HERE)
  for (const line of answer.report) expect(line).not.toContain("remove\t")
})

test("an act asking systemd for no named service is refused as the caller's fault", () => {
  const answer = service(["restart"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("name the service to restart")
})

test("an act asking systemd for two services is refused", () => {
  const answer = service(["stop", "one", "two"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("one service at a time")
})

test("every service is nothing an act asking systemd takes", () => {
  const answer = service(["start", "one", "--all"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("`--all`")
})

test("an act asking systemd for a slug no page carries is the data's fault", () => {
  const answer = service(["restart", "no-such-service-stands-here"], HERE)
  expect(answer.code).toBe(2)
  expect(answer.refusals[0]).toContain("no-such-service-stands-here")
})

test("a dry run names the unit systemd would be asked about and asks nothing", () => {
  const answer = service(["restart", "pages-system-service", "--dry-run"], HERE)
  expect(answer.code).toBe(0)
  expect(answer.refusals).toEqual([])
  expect(answer.report[0]).toBe("restart\tpages-system-service.service")
  expect(answer.report[answer.report.length - 1]).toContain("dry-run")
})
