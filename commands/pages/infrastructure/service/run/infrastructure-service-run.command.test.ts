import { expect, test } from "bun:test"
import { OPERATIONAL } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  calledBy,
  infrastructureServiceRun,
} from "akasha/commands/pages/infrastructure/service/run/infrastructure-service-run.command.code.ts"

const HERE: Given = {
  root: process.cwd(),
  calledAs: "akasha infrastructure service run",
  from: process.cwd(),
  writer: null,
  agentId: null,
}

test("a call naming no service is refused as the caller's fault", async () => {
  const answer = await infrastructureServiceRun([], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("name the service")
})

test("a call naming two services is refused rather than chosen between", async () => {
  const answer = await infrastructureServiceRun(["one", "two"], HERE)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("one service at a time")
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

test("a service that threw part way names in the refusal what that service had done", async () => {
  const answer = await calledBy("send-due-reminders", (done) => {
    done.push("the message to alan, written at agents/messages/one.message.md")
    throw new Error("the second reminder would not arm")
  })

  expect(answer.code).toBe(OPERATIONAL)
  expect(answer.refusals[0]).toContain("would not arm")
  expect(answer.refusals.join("\n")).toContain("agents/messages/one.message.md")
  expect(answer.report).toContain("the message to alan, written at agents/messages/one.message.md")
})

test("a service that did nothing before it threw says nothing about what it did", async () => {
  const answer = await calledBy("send-due-reminders", () => {
    throw new Error("the index would not load")
  })

  expect(answer.refusals.join("\n")).not.toContain("stopped part way")
})

test("a service that ran through says what it did beside the slug it ran", async () => {
  const answer = await calledBy("send-due-reminders", (done) => {
    done.push("the message to alan, written at agents/messages/one.message.md")
  })

  expect(answer.refusals).toEqual([])
  expect(answer.report).toContain("ran\tsend-due-reminders")
  expect(answer.report).toContain("the message to alan, written at agents/messages/one.message.md")
})
