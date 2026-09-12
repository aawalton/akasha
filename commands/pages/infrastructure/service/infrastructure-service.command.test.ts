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

test("a call naming no act is refused with every act this command carries", async () => {
  const answer = await infrastructureService([], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("sweep")
  expect(answer.refusals[0]).toContain("`run`")
})

test("an act this command does not carry is refused by name", async () => {
  const answer = await infrastructureService(["uninstall"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("`uninstall`")
})

test("installing is no act this command carries any more", async () => {
  const answer = await infrastructureService(["install", "pages-service"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("`install` is no act")
})

test("a sweep naming a service is refused as the caller's fault", async () => {
  const answer = await infrastructureService(["sweep", "pages-service"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("every unit akasha owns")
})

test("a flag this command does not take is refused by name", async () => {
  const answer = await infrastructureService(["sweep", "--apply"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("`--apply`")
})

test("a dry run of a sweep asks systemd nothing and plans no unit written or enabled", async () => {
  const answer = await infrastructureService(["sweep", "--dry-run"], HERE)
  expect(answer.code).toBe(0)
  expect(answer.refusals).toEqual([])
  for (const line of answer.report) expect(line).not.toContain("write\t")
  for (const line of answer.report) expect(line).not.toContain("enable\t")
})

test("a sweep says of each unit only that it is to be removed or that it is stranded", async () => {
  const answer = await infrastructureService(["sweep", "--dry-run"], HERE)
  expect(answer.code).toBe(0)
  const said = ["nothing\t", "remove\t", "stranded\t", "dry-run\t"]
  for (const line of answer.report) expect(said.some((one) => line.startsWith(one))).toBe(true)
})

test("an act asking systemd for no named service is refused as the caller's fault", async () => {
  const answer = await infrastructureService(["restart"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("name the service to restart")
})

test("an act asking systemd for two services is refused", async () => {
  const answer = await infrastructureService(["stop", "one", "two"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("one service at a time")
})

test("every service is nothing an act asking systemd takes", async () => {
  const answer = await infrastructureService(["start", "one", "--all"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("`--all`")
})

test("an act asking systemd for a slug no page carries is the data's fault", async () => {
  const answer = await infrastructureService(["restart", "no-such-service-is-here"], HERE)
  expect(answer.code).toBe(2)
  expect(answer.refusals[0]).toContain("no-such-service-is-here")
})

test("a dry run names the unit systemd would be asked about and asks nothing", async () => {
  const answer = await infrastructureService(["restart", "pages-service", "--dry-run"], HERE)
  expect(answer.code).toBe(0)
  expect(answer.refusals).toEqual([])
  expect(answer.report[0]).toBe("restart\tpages-service.service")
  expect(answer.report[answer.report.length - 1]).toContain("dry-run")
})

test("a run naming no service is refused as the caller's fault", async () => {
  const answer = await infrastructureService(["run"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("name the service to run")
})

test("a run naming two services is refused rather than chosen between", async () => {
  const answer = await infrastructureService(["run", "one", "two"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("one service at a time")
})

test("a flag the run does not take is refused by name", async () => {
  const answer = await infrastructureService(["run", "one", "--dry-run"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("`--dry-run`")
})

test("a run naming a slug no service page carries is the data's fault", async () => {
  const answer = await infrastructureService(["run", "no-such-service-is-here"], HERE)
  expect(answer.code).toBe(2)
  expect(answer.refusals[0]).toContain("no-such-service-is-here")
  expect(answer.report).toEqual([])
})

test("a slug another page type carries is no workstation service to run", async () => {
  const answer = await infrastructureService(["run", "service-installing"], HERE)
  expect(answer.code).toBe(2)
  expect(answer.refusals[0]).toContain("service-installing")
  expect(answer.report).toEqual([])
})
