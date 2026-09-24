import { expect, test } from "bun:test"
import {
  answerFor,
  judgedFor,
  narrowedBy,
  narrowedIn,
  SCOPE,
  underASubagent,
} from "akasha/agent/hook/agent-hook/block-subagent-audit/block-subagent-audit.agent-hook.code.ts"
import { UNREADABLE } from "akasha/agent/hook/modules/answer/hook-answer.module.code.ts"

const SEAT = "01a064fd-036b-7000-b22b-8e4196630c07"

const OWN = "a01b97ab7a28aca9e"

const REFUSED = 2

const ASIDE = 0

function payload(command: string, own: string | null): string {
  const held: Record<string, unknown> = {
    hook_event_name: "PreToolUse",
    tool_name: "Bash",
    cwd: "/var/home/walton/repos/akasha",
    tool_input: { command },
  }
  if (own !== null) held["agent_id"] = own
  return JSON.stringify(held)
}

function asSubagent(command: string): number {
  return answerFor(payload(command, OWN)).code
}

function asSeat(command: string): number {
  return answerFor(payload(command, null)).code
}

const BY_PATH = "akasha audit --file-path checks"

const BY_CHECK = "akasha audit --check typecheck"

function parsed(command: string, own: string | null): Record<string, unknown> {
  return JSON.parse(payload(command, own)) as Record<string, unknown>
}

test("the judgement this hook exports judges the payload the dispatch hands it", () => {
  expect(judgedFor(parsed(BY_PATH, OWN)).code).toBe(REFUSED)
  expect(judgedFor(parsed(BY_CHECK, OWN)).code).toBe(ASIDE)
  expect(judgedFor(parsed(BY_PATH, null)).code).toBe(ASIDE)
})

test("a bare audit a subagent calls asks the service, so it is refused by nothing", () => {
  expect(asSubagent("akasha audit")).toBe(ASIDE)
  expect(asSeat("akasha audit")).toBe(ASIDE)
})

test("a run narrowed to named checks asks the service too, so it is refused by nothing", () => {
  expect(asSubagent(BY_CHECK)).toBe(ASIDE)
  expect(asSubagent("akasha audit --check typecheck --check duplicate-rule")).toBe(ASIDE)
  expect(asSeat(BY_CHECK)).toBe(ASIDE)
})

test("a call naming `--file-path`, which the command does not take, is refused", () => {
  expect(asSubagent(BY_PATH)).toBe(REFUSED)
})

test("the refusal names `--file-path` as no argument rather than as a way to narrow files", () => {
  const err = answerFor(payload(BY_PATH, OWN)).err
  expect(err).toContain("`--file-path` IS NO ARGUMENT OF `akasha audit`")
  expect(err).not.toContain("`--file-path` narrows the files as well")
  expect(err).not.toContain("--file-path <one folder>")
})

test("the refusal sends the caller to `--check` rather than to a bare run alone", () => {
  const err = answerFor(payload(BY_PATH, OWN)).err
  expect(err).toContain("NAME THE CHECKS YOU WANTED WITH `--check` AND RUN IT")
  expect(err).not.toContain("judge in this process")
  expect(err).not.toContain("20.4 GB")
  expect(err).not.toContain("what a hook refuses is Alan's to settle")
})

test("the refusal says what a run costs now, each figure measured rather than supposed", () => {
  const err = answerFor(payload(BY_PATH, OWN)).err
  expect(err).toContain("each figure measured rather than supposed")
  expect(err).toContain("a Kubernetes job on a cluster node rather than this workstation")
  expect(err).toContain("162.9 MB peak resident and 0.55s of processor time over 1m36s")
  expect(err).toContain("164.7 MB peak resident and 4.42s of processor time over 25m47s")
})

test("the scope says `--check` is refused by nothing rather than that it judges here", () => {
  const there = SCOPE.join("\n")
  expect(there).toContain("WHY `--check` IS REFUSED BY NOTHING")
  expect(there).not.toContain("Each of these two flags judges in the process that calls it")
  expect(there).not.toContain("is his call to make rather than this hook's to drop")
})

test("the scope keeps the calls this hook does not reach", () => {
  const there = SCOPE.join("\n")
  expect(there).toContain("NOT REACHED")
  expect(there).toContain("a call another program builds")
})

test("every other akasha command is let through", () => {
  expect(asSubagent("akasha read --file-path akasha/akasha.domain.ts")).toBe(ASIDE)
  expect(asSubagent("akasha change apply")).toBe(ASIDE)
  expect(asSubagent("akasha patch show --file-path akasha/hook-system")).toBe(ASIDE)
  expect(asSubagent("akasha index refresh")).toBe(ASIDE)
})

test("a word only holding the name inside it is no audit call", () => {
  expect(asSubagent(`echo ${BY_PATH}`)).toBe(ASIDE)
  expect(asSubagent("rg audit akasha/command-system")).toBe(ASIDE)
  expect(asSubagent("git log --oneline --grep audit")).toBe(ASIDE)
})

test("an audit in a later segment is judged as the first is", () => {
  expect(asSubagent(`cd /var/home/walton/repos/akasha && ${BY_PATH}`)).toBe(REFUSED)
})

test("a prefix that only runs the call behind it does not hide the audit", () => {
  expect(asSubagent(`timeout 900 ${BY_PATH}`)).toBe(REFUSED)
  expect(asSubagent(`nohup ${BY_PATH}`)).toBe(REFUSED)
  expect(asSubagent(`sudo ${BY_PATH}`)).toBe(REFUSED)
})

test("a name set before the call is not the call", () => {
  expect(asSubagent(`HELD=1 ${BY_PATH}`)).toBe(REFUSED)
})

test("the command reached by a path is the same call", () => {
  expect(asSubagent("/var/home/walton/.bun/bin/akasha audit --file-path checks")).toBe(REFUSED)
})

test("a call carrying no command is let through", () => {
  expect(answerFor(JSON.stringify({ agent_id: OWN, tool_input: {} })).code).toBe(ASIDE)
})

test("a payload this cannot read judges nothing and exits so the dispatch passes", () => {
  for (const one of ["{not json", "", "[]", "null", '"held"', "12"]) {
    expect(answerFor(one).code).toBe(UNREADABLE)
    expect(answerFor(one).out).toBe("")
    expect(answerFor(one).err).toContain("would not read")
  }
})

test("the scope no longer says an unreadable payload is left alone", () => {
  const there = SCOPE.join("\n")
  expect(there).toContain("A PAYLOAD THIS CANNOT READ")
  expect(there).not.toContain("nothing is judged and nothing is refused")
})

test("a subagent is read off the payload rather than off the seat", () => {
  expect(underASubagent({ agent_id: OWN })).toBe(true)
  expect(underASubagent({ agent_id: "  " })).toBe(false)
  expect(underASubagent({})).toBe(false)
  expect(underASubagent({ agent_id: `${SEAT}--${OWN}` })).toBe(true)
})

test("the audit is read as the first word after the command, and then its flags", () => {
  expect(narrowedIn(BY_PATH)).toBe(true)
  expect(narrowedIn(BY_CHECK)).toBe(false)
  expect(narrowedIn("akasha audit")).toBe(false)
  expect(narrowedIn("akasha read --file-path akasha/x.ts")).toBe(false)
  expect(narrowedIn("audit --file-path checks")).toBe(false)
  expect(narrowedIn("")).toBe(false)
})

test("a flag before the command name does not hide the audit", () => {
  expect(narrowedIn("akasha --quiet audit --file-path checks")).toBe(true)
})

test("a command line carrying no call is refused for nothing", () => {
  expect(narrowedBy("")).toBe(false)
  expect(narrowedBy("echo hi")).toBe(false)
})
