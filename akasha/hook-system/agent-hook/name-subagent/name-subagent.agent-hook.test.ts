import { expect, test } from "bun:test"
import { join } from "node:path"
import {
  ACTING_NAMED,
  SEAT_NAMED,
  SUBAGENT_MARK,
} from "../../../command-system/reading/reading.module.code.ts"
import { ASIDE, STANDING_ASIDE } from "../../hook-answer/hook-answer.module.code.ts"
import {
  actingIn,
  answerFor,
  calledWith,
  exporting,
  SCOPE,
  spellable,
} from "./name-subagent.agent-hook.code.ts"

const SCRIPT = join(import.meta.dir, "name-subagent.agent-hook.code.ts")

const SEAT = "01a04fc3-fa00-7000-bbc9-a79135819969"

const SUB = "01a04fc3-fa00-7001-8000-000000000001"

const UNDER = `${SEAT}${SUBAGENT_MARK}${SUB}`

const RUNS = "ls -la"

const SEATED: Readonly<Record<string, string>> = { [SEAT_NAMED]: SEAT }

const UNSPELLABLE: readonly string[] = ["a'b", 'a"b', "a b", "a;b", "a$b", "a\nb", "a/b", "a\\b"]

function payloadOf(said: Record<string, unknown>): Record<string, unknown> {
  return {
    hook_event_name: "PreToolUse",
    tool_name: "Bash",
    tool_input: { command: RUNS },
    ...said,
  }
}

function ranWith(
  raw: string,
  env: Readonly<Record<string, string | undefined>>
): { readonly code: number; readonly out: string; readonly err: string } {
  const held: Record<string, string> = { ...process.env } as Record<string, string>
  delete held[SEAT_NAMED]
  for (const [one, standing] of Object.entries(env)) {
    if (standing !== undefined) held[one] = standing
  }
  const ran = Bun.spawnSync(["bun", SCRIPT], { stdin: Buffer.from(raw), env: held })
  return { code: ran.exitCode, out: ran.stdout.toString(), err: ran.stderr.toString() }
}

test("a subagent is named by its seat and its own id together", () => {
  expect(actingIn(SEATED, payloadOf({ agent_id: SUB }))).toBe(UNDER)
  expect(actingIn(SEATED, payloadOf({ agent_id: "other" }))).toBe(`${SEAT}${SUBAGENT_MARK}other`)
})

test("one seat's subagents are told apart", () => {
  const one = actingIn(SEATED, payloadOf({ agent_id: "suba" }))
  const other = actingIn(SEATED, payloadOf({ agent_id: "subb" }))
  expect(one).not.toBe(other)
})

test("a payload naming no subagent comes out as the seat itself", () => {
  expect(actingIn(SEATED, payloadOf({}))).toBe(SEAT)
  expect(actingIn(SEATED, payloadOf({ agent_id: "" }))).toBe(SEAT)
  expect(actingIn(SEATED, payloadOf({ agent_id: "   " }))).toBe(SEAT)
  expect(actingIn(SEATED, payloadOf({ agent_id: 3 }))).toBe(SEAT)
  expect(actingIn(SEATED, payloadOf({ agent_id: null }))).toBe(SEAT)
})

test("with no seat named there is nobody to name a subagent under", () => {
  expect(actingIn({}, payloadOf({ agent_id: SUB }))).toBeNull()
  expect(actingIn({ [SEAT_NAMED]: "" }, payloadOf({ agent_id: SUB }))).toBeNull()
})

test("the name reaches a command through the environment of the call it runs in", () => {
  expect(exporting(UNDER, RUNS)).toBe(`export ${ACTING_NAMED}='${UNDER}'\n${RUNS}`)
})

test("a name is what an id is written in, and nothing else", () => {
  expect(spellable(UNDER)).toBe(true)
  expect(spellable("a_b-C9")).toBe(true)
  expect(spellable("")).toBe(false)
  for (const one of UNSPELLABLE) expect(spellable(one)).toBe(false)
})

test("a call a subagent makes carries its name", () => {
  const said = calledWith(SEATED, payloadOf({ agent_id: SUB }))
  expect(said).toEqual({ command: exporting(UNDER, RUNS) })
})

test("what the call carries beside its command is carried through unchanged", () => {
  const held = { command: RUNS, description: "list", timeout: 5 }
  const said = calledWith(SEATED, payloadOf({ agent_id: SUB, tool_input: held }))
  expect(said).toEqual({ command: exporting(UNDER, RUNS), description: "list", timeout: 5 })
})

test("a call the seat makes carries nothing", () => {
  expect(calledWith(SEATED, payloadOf({}))).toBeNull()
  expect(calledWith(SEATED, payloadOf({ agent_id: "" }))).toBeNull()
})

test("a name that comes out as the seat itself changes nothing", () => {
  expect(actingIn(SEATED, payloadOf({}))).toBe(SEAT)
  expect(calledWith(SEATED, payloadOf({}))).toBeNull()
})

test("with no seat named the call is left as it stands", () => {
  expect(calledWith({}, payloadOf({ agent_id: SUB }))).toBeNull()
})

test("a name holding anything but what an id is written in is left off", () => {
  for (const one of UNSPELLABLE) {
    expect(calledWith(SEATED, payloadOf({ agent_id: one }))).toBeNull()
  }
})

test("a seat whose own id is unspellable names nobody into a command", () => {
  const said = { [SEAT_NAMED]: "seat'; rm -rf /" }
  expect(calledWith(said, payloadOf({ agent_id: SUB }))).toBeNull()
})

test("a call carrying no command, or none that reads as one, is left as it stands", () => {
  for (const one of [{}, { command: "" }, { command: 3 }, { command: null }]) {
    expect(calledWith(SEATED, payloadOf({ agent_id: SUB, tool_input: one }))).toBeNull()
  }
})

test("a payload carrying no tool input at all is left as it stands", () => {
  const said = { hook_event_name: "PreToolUse", agent_id: SUB }
  expect(calledWith(SEATED, said)).toBeNull()
  expect(calledWith(SEATED, { ...said, tool_input: "ls" })).toBeNull()
})

test("a call a subagent makes is answered with the input it is to run with", () => {
  const said = answerFor(SEATED, JSON.stringify(payloadOf({ agent_id: SUB })))
  expect(said.code).toBe(ASIDE)
  expect(JSON.parse(said.out)).toEqual({
    hookSpecificOutput: {
      hookEventName: "PreToolUse",
      updatedInput: { command: exporting(UNDER, RUNS) },
    },
  })
})

test("a payload naming no subagent is stood aside from", () => {
  expect(answerFor(SEATED, JSON.stringify(payloadOf({})))).toEqual(STANDING_ASIDE)
})

test("a payload that will not read is stood aside from", () => {
  for (const one of ["", "{ not json", "[]", "null", '"one"', "3"]) {
    expect(answerFor(SEATED, one)).toEqual(STANDING_ASIDE)
  }
})

test("this hook refuses nothing, whatever it is handed", () => {
  const every = [
    JSON.stringify(payloadOf({ agent_id: SUB })),
    JSON.stringify(payloadOf({})),
    JSON.stringify(payloadOf({ agent_id: "a'b" })),
    "{ not json",
    "",
  ]
  for (const one of every) {
    const said = answerFor(SEATED, one)
    expect(said.code).toBe(ASIDE)
    expect(said.err).toBe("")
  }
})

test("the scope says what this reaches and what it does not", () => {
  const said = SCOPE.join("\n")
  expect(said).toContain("refuses nothing")
  expect(said).toContain("NOT REACHED")
  expect(said).toContain("is NOT a finding")
  expect(said).toContain("changes what a call runs rather than judging it")
})

test("the hook run as the harness runs it hands the named call back", () => {
  const said = ranWith(JSON.stringify(payloadOf({ agent_id: SUB })), SEATED)
  expect(said.code).toBe(ASIDE)
  expect(said.err).toBe("")
  expect(JSON.parse(said.out).hookSpecificOutput.updatedInput.command).toBe(exporting(UNDER, RUNS))
})

test("the hook run as the harness runs it says nothing of a seat's own call", () => {
  const every: readonly { readonly raw: string; readonly env: Record<string, string> }[] = [
    { raw: JSON.stringify(payloadOf({})), env: SEATED },
    { raw: JSON.stringify(payloadOf({ agent_id: SUB })), env: {} },
    { raw: "{ not json", env: SEATED },
    { raw: "", env: SEATED },
  ]
  for (const one of every) {
    const said = ranWith(one.raw, one.env)
    expect(said.code).toBe(ASIDE)
    expect(said.out).toBe("")
  }
})

test("the hook prints its scope when it is asked", () => {
  const ran = Bun.spawnSync(["bun", SCRIPT, "--scope"], { stdin: Buffer.from("") })
  expect(ran.exitCode).toBe(ASIDE)
  expect(ran.stdout.toString()).toContain("NOT REACHED")
})
