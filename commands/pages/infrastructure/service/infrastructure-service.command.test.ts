import { expect, test } from "bun:test"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { infrastructureService } from "akasha/commands/pages/infrastructure/service/infrastructure-service.command.code.ts"

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
  expect(answer.refusals[0]).toContain("sweep")
})

test("an act this command does not carry is refused by name", () => {
  const answer = infrastructureService(["uninstall"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("`uninstall`")
})

test("installing is no act this command carries any more", () => {
  const answer = infrastructureService(["install", "pages-service"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("`install` is no act")
})

test("a sweep naming a service is refused as the caller's fault", () => {
  const answer = infrastructureService(["sweep", "pages-service"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("every unit akasha owns")
})

test("a flag this command does not take is refused by name", () => {
  const answer = infrastructureService(["sweep", "--apply"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("`--apply`")
})

test("a dry run of a sweep writes nothing and asks systemd nothing", () => {
  const answer = infrastructureService(["sweep", "--dry-run"], HERE)
  expect(answer.code).toBe(0)
  expect(answer.refusals).toEqual([])
})

test("a sweep plans no unit to be written", () => {
  const answer = infrastructureService(["sweep", "--dry-run"], HERE)
  for (const line of answer.report) expect(line).not.toContain("write\t")
})

test("a sweep plans no unit to be enabled", () => {
  const answer = infrastructureService(["sweep", "--dry-run"], HERE)
  for (const line of answer.report) expect(line).not.toContain("enable\t")
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
