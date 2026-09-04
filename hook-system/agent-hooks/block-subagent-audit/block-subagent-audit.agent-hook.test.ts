import { expect, test } from "bun:test"
import {
  answerFor,
  auditedIn,
  auditIn,
  underASubagent,
} from "./block-subagent-audit.agent-hook.code.ts"

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

test("an audit a subagent calls is refused", () => {
  expect(asSubagent("akasha audit")).toBe(REFUSED)
})

test("the seat that ran the subagent runs the audit still", () => {
  expect(asSeat("akasha audit")).toBe(ASIDE)
})

test("a run narrowed to one check is refused as a whole audit is", () => {
  expect(asSubagent("akasha audit --check typecheck")).toBe(REFUSED)
  expect(asSubagent("akasha audit --check typecheck --check duplicate-rule")).toBe(REFUSED)
})

test("a seat's narrowed run is let through too", () => {
  expect(asSeat("akasha audit --check typecheck")).toBe(ASIDE)
})

test("the refusal says what a run costs rather than what a run writes", () => {
  const err = answerFor(payload("akasha audit", OWN)).err
  expect(err).toContain("17 GB")
  expect(err).toContain("fifteen minutes")
  expect(err).toContain("what a run COSTS while it holds the machine")
  expect(err).toContain("--check")
})

test("the refusal names what answers instead", () => {
  const err = answerFor(payload("akasha audit", OWN)).err
  expect(err).toContain("akasha test --file-path")
  expect(err).toContain("akasha lint --file-path")
})

test("every other akasha command is let through", () => {
  expect(asSubagent("akasha read --file-path akasha/akasha.domain.ts")).toBe(ASIDE)
  expect(asSubagent("akasha test --file-path akasha/hook-system")).toBe(ASIDE)
  expect(asSubagent("akasha lint --file-path akasha/hook-system")).toBe(ASIDE)
  expect(asSubagent("akasha index refresh")).toBe(ASIDE)
})

test("a word only holding the name inside it is no audit call", () => {
  expect(asSubagent("echo akasha audit")).toBe(ASIDE)
  expect(asSubagent("rg audit akasha/command-system")).toBe(ASIDE)
  expect(asSubagent("git log --oneline --grep audit")).toBe(ASIDE)
})

test("an audit in a later segment is judged as the first is", () => {
  expect(asSubagent("cd /var/home/walton/repos/akasha && akasha audit")).toBe(REFUSED)
})

test("a prefix that only runs the call behind it does not hide the audit", () => {
  expect(asSubagent("timeout 900 akasha audit")).toBe(REFUSED)
  expect(asSubagent("nohup akasha audit")).toBe(REFUSED)
  expect(asSubagent("sudo akasha audit")).toBe(REFUSED)
})

test("a name set before the call is not the call", () => {
  expect(asSubagent("HELD=1 akasha audit")).toBe(REFUSED)
})

test("the command reached by a path is the same call", () => {
  expect(asSubagent("/var/home/walton/.bun/bin/akasha audit")).toBe(REFUSED)
})

test("a call carrying no command is let through", () => {
  expect(answerFor(JSON.stringify({ agent_id: OWN, tool_input: {} })).code).toBe(ASIDE)
})

test("a payload that will not read refuses nobody", () => {
  expect(answerFor("{not json").code).toBe(ASIDE)
  expect(answerFor("").code).toBe(ASIDE)
})

test("a subagent is read off the payload rather than off the seat", () => {
  expect(underASubagent({ agent_id: OWN })).toBe(true)
  expect(underASubagent({ agent_id: "  " })).toBe(false)
  expect(underASubagent({})).toBe(false)
  expect(underASubagent({ agent_id: `${SEAT}--${OWN}` })).toBe(true)
})

test("the audit is read as the first word after the command", () => {
  expect(auditIn("akasha audit")).toBe(true)
  expect(auditIn("akasha read --file-path akasha/x.ts")).toBe(false)
  expect(auditIn("audit")).toBe(false)
  expect(auditIn("")).toBe(false)
})

test("a flag before the command name does not hide the audit", () => {
  expect(auditIn("akasha --quiet audit")).toBe(true)
})

test("a command line carrying no call is refused for nothing", () => {
  expect(auditedIn("")).toBe(false)
  expect(auditedIn("echo hi")).toBe(false)
})
