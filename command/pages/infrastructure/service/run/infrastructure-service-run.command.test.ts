import { expect, test } from "bun:test"
import { OPERATIONAL } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  alreadyUp,
  calledBy,
  infrastructureServiceRun,
} from "akasha/command/pages/infrastructure/service/run/infrastructure-service-run.command.code.ts"

const HERE: Given = {
  root: process.cwd(),
  calledAs: "akasha infrastructure service run",
  from: process.cwd(),
  writer: null,
  agentId: null,
}

const UP = { activeState: "active", result: "success", changedAt: null } as const

const DOWN = { activeState: "inactive", result: "success", changedAt: null } as const

test("a call naming no service is refused as the caller's fault", async () => {
  const answer = await infrastructureServiceRun([], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("<slug>")
  expect(answer.refusals[0]).toContain("nothing said it")
})

test("a call naming two services is refused rather than chosen between", async () => {
  const answer = await infrastructureServiceRun(["one", "two"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("takes 1 word")
})

test("a flag this does not take is refused by name", async () => {
  const answer = await infrastructureServiceRun(["one", "--dry-run"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("`--dry-run`")
})

test("a slug no service page carries is the caller's fault", async () => {
  const answer = await infrastructureServiceRun(["no-such-service-is-here"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("no-such-service-is-here")
  expect(answer.report).toEqual([])
})

test("a slug another page type carries is no workstation service to run", async () => {
  const answer = await infrastructureServiceRun(["service-installing"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("service-installing")
  expect(answer.report).toEqual([])
})

test("a service whose unit is already running is refused rather than run beside it", async () => {
  const answer = await infrastructureServiceRun(["dcgm-exporter"], HERE, () => UP)
  expect(answer.code).toBe(OPERATIONAL)
  expect(answer.refusals[0]).toContain("dcgm-exporter.service is already running")
  expect(answer.report).toEqual([])
})

test("the refusal says to stop that unit or to watch what its journal holds", () => {
  const answer = alreadyUp("held-service", () => UP)
  expect(answer?.refusals[0]).toContain("akasha infrastructure service stop held-service")
  expect(answer?.refusals[0]).toContain("journalctl --user -u held-service.service -f")
})

test("a unit coming up or reloading is already running as much as an active one", () => {
  expect(alreadyUp("held-service", () => ({ ...UP, activeState: "activating" }))).not.toBe(null)
  expect(alreadyUp("held-service", () => ({ ...UP, activeState: "reloading" }))).not.toBe(null)
})

test("a unit resting, failed or unknown to systemd is no reason to refuse a run", () => {
  expect(alreadyUp("held-service", () => DOWN)).toBe(null)
  expect(alreadyUp("held-service", () => ({ ...DOWN, activeState: "failed" }))).toBe(null)
  expect(alreadyUp("held-service", () => undefined)).toBe(null)
})

test("the unit asked after is the service unit rather than the timer beside it", () => {
  let asked = ""
  alreadyUp("held-service", (unit) => {
    asked = unit
    return DOWN
  })
  expect(asked).toBe("held-service.service")
})

test("a service that threw part way names in the refusal what that service had done", async () => {
  const answer = await calledBy("send-due-reminders", (done) => {
    done.push("the message to alan, written at agent/messages/one.message.md")
    throw new Error("the second reminder would not arm")
  })

  expect(answer.code).toBe(OPERATIONAL)
  expect(answer.refusals[0]).toContain("would not arm")
  expect(answer.refusals.join("\n")).toContain("agent/messages/one.message.md")
  expect(answer.report).toContain("the message to alan, written at agent/messages/one.message.md")
})

test("a service that did nothing before it threw says nothing about what it did", async () => {
  const answer = await calledBy("send-due-reminders", () => {
    throw new Error("the index would not load")
  })

  expect(answer.refusals.join("\n")).not.toContain("stopped part way")
})

test("a service that ran through says what it did beside the slug it ran", async () => {
  const answer = await calledBy("send-due-reminders", (done) => {
    done.push("the message to alan, written at agent/messages/one.message.md")
  })

  expect(answer.refusals).toEqual([])
  expect(answer.report).toContain("ran\tsend-due-reminders")
  expect(answer.report).toContain("the message to alan, written at agent/messages/one.message.md")
})
