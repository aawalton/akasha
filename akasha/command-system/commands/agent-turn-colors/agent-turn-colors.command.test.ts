import { expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import type { Given } from "@akasha/command-system/calling"
import type { SeatTurnState } from "@tools/lib/seat-turn-state"
import {
  agentTurnColors,
  colorsOfStates,
  colorsSaid,
  readIn,
  STATE,
  statedAs,
} from "./agent-turn-colors.command.code.ts"

const ROOT = "/nowhere"

function givenIn(): Given {
  return {
    root: ROOT,
    calledAs: "akasha agent-turn-colors",
    from: ROOT,
    writer: null,
    agentId: null,
  }
}

const WORKING_PAGE = "akasha/seat-system/seat-turn-states/pages/working.seat-turn-state.ts"

// A root of our own, holding the one page `--state working` reads. It sits under `/var/tmp` and
// not under `/tmp`: `/tmp` here is a tmpfs whose inode ceiling this workstation has reached twice,
// and a fixture that cannot be written reads as a broken command rather than as a full disk.
function rootWith(color: string): string {
  const at = mkdtempSync(join("/var/tmp", "agent-turn-colors-test-"))
  mkdirSync(join(at, dirname(WORKING_PAGE)), { recursive: true })
  colorIn(at, color)
  return at
}

// The page as the color reader loads one: the body is transpiled and evaluated, and the type
// import a landed page carries is erased before that, so a root of our own needs no node_modules.
function colorIn(at: string, color: string): undefined {
  writeFileSync(
    join(at, WORKING_PAGE),
    `export const working = {\n  pageTypeSlug: "seat-turn-state",\n  slug: "working",\n` +
      `  definition: "an agent taking a turn",\n  colorSlug: "${color}",\n} as const\n`
  )
  return undefined
}

test("bare words are agent ids", () => {
  expect(readIn(["01a0-one", "01a0-two"])).toEqual({ agents: ["01a0-one", "01a0-two"] })
})

test("a call naming nothing asks about no agent at all", () => {
  expect(readIn([])).toEqual({ agents: [] })
})

test("`--state` is repeatable", () => {
  expect(readIn([STATE, "working", STATE, "stopped"])).toEqual({ states: ["working", "stopped"] })
})

test("ids and states are never asked for together", () => {
  const said = readIn([STATE, "working", "01a0-one"])

  expect("refused" in said && said.refused[0]).toContain("never both in one call")
})

test("a name no turn state carries is refused rather than left out", () => {
  const said = readIn([STATE, "nope"])

  expect("refused" in said && said.refused[0]).toContain("nope names no turn state")
})

test("every name no turn state carries is named rather than the first of them alone", () => {
  const said = readIn([STATE, "nope", STATE, "working", STATE, "elsewhere"])

  expect("refused" in said && said.refused[0]).toContain("nope elsewhere")
})

test("`--state` naming nothing after it is refused", () => {
  const said = readIn([STATE])

  expect("refused" in said && said.refused[0]).toContain("takes the name of a turn state after it")
})

test("a flag this does not take is refused", () => {
  const said = readIn(["--json"])

  expect("refused" in said && said.refused[0]).toContain("`--json`")
})

test("a turn state is told from a name that is no turn state", () => {
  expect(statedAs("idle-pending")).toBe("idle-pending")
  expect(statedAs("idlepending")).toBe(null)
})

test("a state whose page names no color is left out rather than answered an empty name", () => {
  const colors = colorsOfStates(["working", "stopped"], (state) =>
    state === "working" ? "green" : null
  )

  expect(colors).toEqual({ working: "green" })
})

test("what is said is one object carrying the colors and nothing else", () => {
  const said = JSON.parse(colorsSaid({ working: "green" }))

  expect(Object.keys(said)).toEqual(["colors"])
  expect(said.colors).toEqual({ working: "green" })
})

test("a word this does not take refuses as a fault in the call", () => {
  const said = agentTurnColors(["--json"], givenIn())

  expect(said.code).toBe(1)
  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("`--json`")
})

// THIS ARM IS WHAT PROVES `@tools/lib/agent-turn-drawn` RESOLVES. Every arm above drives a seeded
// reader or no reader at all, so all of them would pass with that specifier misspelt into a module
// that is not there — no test would load it. This one takes the agent road, which reaches it.
test("an id no seat ever held is left out rather than refused", () => {
  const said = agentTurnColors(["01a00000-0000-7000-8000-00000000000a"], givenIn())

  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(JSON.parse(said.report[0] ?? "")).toEqual({ colors: {} })
})

// THE WHOLE POINT OF THE VERB SERVER, AND THE ARM THAT WOULD CATCH A CACHE. The server answers
// this from one long-lived process, so a color rewritten under that process is the color the next
// ask must answer. This drives the real reader against a root of its own and rewrites the page
// between the two calls. It also proves `@tools/lib/seat-turn-color` resolves.
test("a color rewritten under this command is the color it next answers", () => {
  const root = rootWith("chartreuse")
  const was = process.env["AKASHA_ROOT"]
  try {
    process.env["AKASHA_ROOT"] = root
    const first = agentTurnColors([STATE, "working"], givenIn())

    expect(first.refusals).toEqual([])
    expect(JSON.parse(first.report[0] ?? "")).toEqual({ colors: { working: "chartreuse" } })

    colorIn(root, "vermilion")
    const second = agentTurnColors([STATE, "working"], givenIn())

    expect(JSON.parse(second.report[0] ?? "")).toEqual({ colors: { working: "vermilion" } })
  } finally {
    if (was === undefined) delete process.env["AKASHA_ROOT"]
    else process.env["AKASHA_ROOT"] = was
    rmSync(root, { recursive: true, force: true })
  }
})

// THE CONTROL FOR THE ARM ABOVE, because a comparison that cannot fail is worse than none. A
// reader that keeps its first answer passes the same two calls and answers the old color twice,
// so this shows the comparison the arm above makes is one a kept value does not survive.
test("a reader keeping its answer says the old color, which that comparison catches", () => {
  const said: Record<string, string> = { working: "chartreuse" }
  let held: string | null = null
  const keeping = (state: SeatTurnState): string | null => (held ??= said[state] ?? null)

  expect(colorsOfStates(["working"], keeping)).toEqual({ working: "chartreuse" })
  said["working"] = "vermilion"

  expect(colorsOfStates(["working"], keeping)).toEqual({ working: "chartreuse" })
})
