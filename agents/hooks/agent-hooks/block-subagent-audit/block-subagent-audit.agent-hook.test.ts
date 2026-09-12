import { expect, test } from "bun:test"
import {
  answerFor,
  narrowedBy,
  narrowedIn,
  SCOPE,
  underASubagent,
} from "akasha/agents/hooks/agent-hooks/block-subagent-audit/block-subagent-audit.agent-hook.code.ts"
import { UNREADABLE } from "akasha/agents/hooks/answer/hook-answer.module.code.ts"

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

const NARROWED = "akasha audit --check typecheck"

test("a bare audit a subagent calls asks the service, so it is refused by nothing", () => {
  expect(asSubagent("akasha audit")).toBe(ASIDE)
  expect(asSeat("akasha audit")).toBe(ASIDE)
})

test("a run narrowed to one check is refused", () => {
  expect(asSubagent(NARROWED)).toBe(REFUSED)
  expect(asSubagent("akasha audit --check typecheck --check duplicate-rule")).toBe(REFUSED)
})

test("a run narrowed to one path is refused", () => {
  expect(asSubagent("akasha audit --file-path checks")).toBe(REFUSED)
})

test("a seat's narrowed run is let through", () => {
  expect(asSeat(NARROWED)).toBe(ASIDE)
})

test("the refusal says what a run costs rather than what a run writes", () => {
  const err = answerFor(payload(NARROWED, OWN)).err
  expect(err).toContain("20.4 GB")
  expect(err).toContain("what a run COSTS while it holds the machine")
  expect(err).toContain("--check")
})

test("the refusal says what narrowing costs rather than denying that narrowing helps", () => {
  const err = answerFor(payload(NARROWED, OWN)).err
  expect(err).toContain("--file-path")
  expect(err).toContain("1.5 GB")
  expect(err).toContain("0.6 GB")
  expect(err).toContain("reads who calls rather than what the call asks for")
})

test("the refusal names the bare run as what answers instead", () => {
  const err = answerFor(payload(NARROWED, OWN)).err
  expect(err).toContain("`akasha audit` bare")
  expect(err).toContain("`akasha change draft` and `akasha change apply`")
  expect(err).toContain("The tests, the typecheck and the linter all")
})

test("every other akasha command is let through", () => {
  expect(asSubagent("akasha read --file-path akasha/akasha.domain.ts")).toBe(ASIDE)
  expect(asSubagent("akasha change apply")).toBe(ASIDE)
  expect(asSubagent("akasha patch show --file-path akasha/hook-system")).toBe(ASIDE)
  expect(asSubagent("akasha index refresh")).toBe(ASIDE)
})

test("a word only holding the name inside it is no audit call", () => {
  expect(asSubagent("echo akasha audit --check typecheck")).toBe(ASIDE)
  expect(asSubagent("rg audit akasha/command-system")).toBe(ASIDE)
  expect(asSubagent("git log --oneline --grep audit")).toBe(ASIDE)
})

test("an audit in a later segment is judged as the first is", () => {
  expect(asSubagent("cd /var/home/walton/repos/akasha && akasha audit --check typecheck")).toBe(
    REFUSED
  )
})

test("a prefix that only runs the call behind it does not hide the audit", () => {
  expect(asSubagent(`timeout 900 ${NARROWED}`)).toBe(REFUSED)
  expect(asSubagent(`nohup ${NARROWED}`)).toBe(REFUSED)
  expect(asSubagent(`sudo ${NARROWED}`)).toBe(REFUSED)
})

test("a name set before the call is not the call", () => {
  expect(asSubagent(`HELD=1 ${NARROWED}`)).toBe(REFUSED)
})

test("the command reached by a path is the same call", () => {
  expect(asSubagent("/var/home/walton/.bun/bin/akasha audit --check typecheck")).toBe(REFUSED)
})

test("a call carrying no command is let through", () => {
  expect(answerFor(JSON.stringify({ agent_id: OWN, tool_input: {} })).code).toBe(ASIDE)
})

test("a payload this cannot read judges nothing and exits so the dispatch refuses", () => {
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
  expect(narrowedIn("akasha audit --check typecheck")).toBe(true)
  expect(narrowedIn("akasha audit --file-path checks")).toBe(true)
  expect(narrowedIn("akasha audit")).toBe(false)
  expect(narrowedIn("akasha read --file-path akasha/x.ts")).toBe(false)
  expect(narrowedIn("audit --check typecheck")).toBe(false)
  expect(narrowedIn("")).toBe(false)
})

test("a flag before the command name does not hide the audit", () => {
  expect(narrowedIn("akasha --quiet audit --check typecheck")).toBe(true)
})

test("a command line carrying no call is refused for nothing", () => {
  expect(narrowedBy("")).toBe(false)
  expect(narrowedBy("echo hi")).toBe(false)
})
