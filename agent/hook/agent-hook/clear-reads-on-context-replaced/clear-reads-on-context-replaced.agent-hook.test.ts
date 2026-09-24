import { afterAll, expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import {
  actingIn,
  agentIn,
  cleared,
  clearingsAt,
  KEPT_FOR,
  NAMED,
  NOTHING_SWEPT,
  noted,
  replacing,
  SCOPE,
  seatIn,
  sourceIn,
  took,
} from "akasha/agent/hook/agent-hook/clear-reads-on-context-replaced/clear-reads-on-context-replaced.agent-hook.code.ts"
import {
  readingIn,
  recordRead,
  SUBAGENT_MARK,
} from "akasha/agent/modules/read-record/read-record.module.code.ts"
import {
  NOBODY,
  AGENT as ONE,
  rootedAs,
  scratch,
  OTHER as TWO,
  UNDER as UNDER_A,
  UNDER_OTHER,
  UNDER_TOO,
} from "akasha/agent/modules/read-record/read-record.module.test-fixtures.ts"
import { ran } from "akasha/code/spawning/modules/running/running.module.code.ts"
import { z } from "zod"

const CLEARING = z.looseObject({
  agentId: z.string(),
  source: z.string(),
  took: z.boolean(),
  stale: z.number(),
})

const SCRIPT = join(import.meta.dir, "clear-reads-on-context-replaced.agent-hook.code.ts")

const REPLACING: readonly string[] = ["startup", "clear", "compact", "fork"]

const KEEPING: readonly string[] = ["resume", "", "other", "Startup", "compaction", "session"]

afterAll(scratch.sweep)

const PAGE = "akasha/a.ts"

function oidHeld(root: string, agentId: string): string | null {
  return readingIn(root, agentId, PAGE)?.oid ?? null
}

function seeded(root: string, agentId: string, seenAt: number = Date.now()): undefined {
  recordRead(root, agentId, { path: PAGE, oid: agentId, seenAt, carriedOid: null })
  return undefined
}

function rooted(): string {
  const root = rootedAs("akasha-clearing-")
  for (const one of [ONE, TWO]) seeded(root, one)
  return root
}

function bare(): string {
  return rootedAs("akasha-clearing-")
}

function payloadOf(source: string, acting?: string): string {
  const held: Record<string, string> = { hook_event_name: "SessionStart", source }
  if (acting !== undefined) held.agent_id = acting
  return JSON.stringify(held)
}

function ranWith(
  source: string,
  named: string | null,
  acting?: string
): { readonly code: number; readonly out: string } {
  const held: Record<string, string> = { ...process.env } as Record<string, string>
  if (named === null) delete held[NAMED]
  else held[NAMED] = named
  const done = ran(["bun", SCRIPT], { stdin: Buffer.from(payloadOf(source, acting)), env: held })
  return { code: done.code, out: done.out }
}

test("a startup, a clearing and a compaction each replace the context", () => {
  for (const one of REPLACING) expect(replacing(one)).toBe(true)
})

test("a resumed session, and a source this does not name, replace nothing", () => {
  for (const one of KEEPING) expect(replacing(one)).toBe(false)
})

test("a context replaced takes the record with it", () => {
  for (const one of REPLACING) {
    const root = rooted()
    expect(took(cleared(root, ONE, one))).toBe(true)
    expect(oidHeld(root, ONE)).toBeNull()
  }
})

test("a resumed session keeps its readings", () => {
  const root = rooted()
  expect(took(cleared(root, ONE, "resume"))).toBe(false)
  expect(oidHeld(root, ONE)).toBe(ONE)
})

test("a source this does not recognise leaves the record in place", () => {
  for (const one of KEEPING) {
    const root = rooted()
    expect(took(cleared(root, ONE, one))).toBe(false)
    expect(oidHeld(root, ONE)).toBe(ONE)
  }
})

test("one agent's readings are cleared, never another's", () => {
  for (const one of REPLACING) {
    const root = rooted()
    cleared(root, ONE, one)
    expect(oidHeld(root, ONE)).toBeNull()
    expect(oidHeld(root, TWO)).toBe(TWO)
  }
})

test("a reading last seen more than a day ago goes whoever holds it", () => {
  const root = rootedAs("akasha-clearing-")
  seeded(root, ONE)
  seeded(root, TWO, Date.now() - KEPT_FOR - 1)
  expect(cleared(root, ONE, "compact")).toEqual({ agent: 1, stale: 1 })
  expect(oidHeld(root, TWO)).toBeNull()
})

const UNDER_ONE: readonly string[] = [UNDER_A, UNDER_TOO]

const SEATED: readonly string[] = [ONE, ...UNDER_ONE, TWO, UNDER_OTHER]

function seated(): string {
  const root = rootedAs("akasha-clearing-")
  for (const one of SEATED) seeded(root, one)
  return root
}

test("a seat's subagents' records are left where they are when the seat's own context goes", () => {
  for (const one of REPLACING) {
    const root = seated()
    expect(took(cleared(root, ONE, one))).toBe(true)
    expect(oidHeld(root, ONE)).toBeNull()
    for (const said of UNDER_ONE) expect(oidHeld(root, said)).toBe(said)
  }
})

test("a subagent starting takes its own record and no sibling's", () => {
  for (const one of REPLACING) {
    const root = seated()
    expect(took(cleared(root, UNDER_A, one))).toBe(true)
    expect(oidHeld(root, UNDER_A)).toBeNull()
    for (const said of [ONE, UNDER_TOO, TWO, UNDER_OTHER]) {
      expect(oidHeld(root, said)).toBe(said)
    }
  }
})

test("another seat's records remain while one seat's is cleared", () => {
  const root = seated()
  cleared(root, ONE, "startup")
  expect(oidHeld(root, TWO)).toBe(TWO)
  expect(oidHeld(root, UNDER_OTHER)).toBe(UNDER_OTHER)
})

test("a resumed seat keeps its subagents' records too", () => {
  const root = seated()
  expect(took(cleared(root, ONE, "resume"))).toBe(false)
  for (const one of SEATED) expect(oidHeld(root, one)).toBe(one)
})

test("a fork takes the forking agent's record and no other agent's", () => {
  const root = seated()
  expect(took(cleared(root, ONE, "fork"))).toBe(true)
  expect(oidHeld(root, ONE)).toBeNull()
  for (const said of [...UNDER_ONE, TWO, UNDER_OTHER]) expect(oidHeld(root, said)).toBe(said)
})

test("another agent's readings remain through a source that clears nothing", () => {
  const root = rooted()
  cleared(root, ONE, "resume")
  expect(oidHeld(root, TWO)).toBe(TWO)
})

test("with no agent named, no agent's own readings are cleared", () => {
  for (const one of REPLACING) {
    const root = rooted()
    expect(took(cleared(root, null, one))).toBe(false)
    expect(took(cleared(root, "", one))).toBe(false)
    expect(oidHeld(root, ONE)).toBe(ONE)
    expect(oidHeld(root, TWO)).toBe(TWO)
  }
})

test("a record that is not there is no clearing", () => {
  const root = bare()
  expect(took(cleared(root, ONE, "startup"))).toBe(false)
  expect(oidHeld(root, ONE)).toBeNull()
})

test("an index that will not answer which agents there are leaves every record as it is", () => {
  const root = scratch.rootFor("akasha-clearing-")
  expect(cleared(root, ONE, "startup")).toEqual(NOTHING_SWEPT)
})

test("an agent no page names is no clearing either", () => {
  const root = rooted()
  expect(took(cleared(root, NOBODY, "startup"))).toBe(false)
})

test("a clearing is written down where the records are", () => {
  const root = rooted()
  noted(root, ONE, "startup", cleared(root, ONE, "startup"))
  const said = CLEARING.parse(JSON.parse(readFileSync(clearingsAt(root), "utf8").trim()))
  expect(said.agentId).toBe(ONE)
  expect(said.source).toBe("startup")
  expect(said.took).toBe(true)
  expect(said.stale).toBe(0)
})

test("a clearing that took no record is written down saying so", () => {
  const root = rooted()
  noted(root, NOBODY, "compact", cleared(root, NOBODY, "compact"))
  expect(readFileSync(clearingsAt(root), "utf8")).toContain('"took":false')
})

test("a clearing is added to what is written down rather than replacing it", () => {
  const root = rooted()
  noted(root, ONE, "startup", { agent: 1, stale: 0 })
  noted(root, TWO, "compact", NOTHING_SWEPT)
  const lines = readFileSync(clearingsAt(root), "utf8").trim().split("\n")
  expect(lines).toHaveLength(2)
  expect(lines[1]).toContain(TWO)
})

test("a clearing is written down beside this hook's own page", () => {
  const root = rooted()
  noted(root, ONE, "startup", NOTHING_SWEPT)
  expect(clearingsAt(root)).toBe(
    join(
      root,
      "agent/hook/agent-hook/clear-reads-on-context-replaced",
      "clear-reads-on-context-replaced.agent-hook.clearings.uncommitted.jsonl"
    )
  )
  expect(existsSync(clearingsAt(root))).toBe(true)
})

test("the seat is the one AGENT_ID names, and an empty name names none", () => {
  expect(seatIn({ AGENT_ID: ONE })).toBe(ONE)
  expect(seatIn({ AGENT_ID: "" })).toBeNull()
  expect(seatIn({})).toBeNull()
})

test("the acting agent is the one the payload names, and only where it names one", () => {
  expect(actingIn(payloadOf("startup", "suba"))).toBe("suba")
  expect(actingIn(payloadOf("startup"))).toBeNull()
  expect(actingIn(JSON.stringify({ agent_id: "  " }))).toBeNull()
  expect(actingIn(JSON.stringify({ agent_id: 1 }))).toBeNull()
  expect(actingIn("{")).toBeNull()
})

test("the agent whose context went is the seat, or the subagent acting under it", () => {
  expect(agentIn({ AGENT_ID: ONE }, payloadOf("startup"))).toBe(ONE)
  expect(agentIn({ AGENT_ID: ONE }, payloadOf("startup", "suba"))).toBe(
    `${ONE}${SUBAGENT_MARK}suba`
  )
  expect(agentIn({}, payloadOf("startup", "suba"))).toBeNull()
})

test("the source is read from the payload the harness sends", () => {
  for (const one of [...REPLACING, "resume"]) expect(sourceIn(payloadOf(one))).toBe(one)
})

test("a payload that says no source, or will not parse, names none", () => {
  expect(sourceIn("{}")).toBe("")
  expect(sourceIn(JSON.stringify({ source: 1 }))).toBe("")
  expect(sourceIn("{")).toBe("")
  expect(sourceIn("")).toBe("")
})

test("the scope says what this reaches and what it does not", () => {
  const said = SCOPE.join("\n")
  expect(said).toContain("refuses nothing")
  expect(said).toContain("NOT REACHED")
  expect(said).toContain("is NOT a finding")
  expect(said).toContain("acts rather than judges")
  expect(said).toContain("WHAT IS WRITTEN DOWN")
})

test("the session begins either way, and the hook says nothing", () => {
  for (const one of ["compact", "resume"]) {
    const done = ranWith(one, NOBODY)
    expect(done.code).toBe(0)
    expect(done.out).toBe("")
  }
})

test("the hook run as the harness runs it begins the session and says nothing", () => {
  for (const one of ["startup", "resume"]) {
    const done = ranWith(one, NOBODY)
    expect(done.code).toBe(0)
    expect(done.out).toBe("")
  }
})

test("the hook run as the harness runs it names the subagent the payload names", () => {
  expect(agentIn({ AGENT_ID: ONE }, payloadOf("startup", "suba"))).toBe(
    `${ONE}${SUBAGENT_MARK}suba`
  )
  expect(ranWith("startup", ONE, "suba").code).toBe(0)
})

test("the session begins with no agent named, and on a payload that will not parse", () => {
  expect(ranWith("startup", null).code).toBe(0)
  const done = ran(["bun", SCRIPT], { stdin: Buffer.from("{") })
  expect(done.code).toBe(0)
  expect(done.out).toBe("")
})

test("the hook prints its scope when it is asked", () => {
  const done = ran(["bun", SCRIPT, "--scope"], { stdin: Buffer.from("") })
  expect(done.code).toBe(0)
  expect(done.out).toContain("NOT REACHED")
})
