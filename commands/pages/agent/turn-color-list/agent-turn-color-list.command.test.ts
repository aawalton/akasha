import { expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  colorIn,
  WORKING_PAGE,
} from "akasha/agents/seats/modules/turn-color/seat-turn-color.module.test-fixtures.ts"
import { turnState } from "akasha/commands/arguments/pages/turn-state.argument.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { ROOT_NAMED } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import {
  agentTurnColorList,
  colorsOfStates,
  colorsSaid,
  statedAs,
  wrongIn,
} from "akasha/commands/pages/agent/turn-color-list/agent-turn-color-list.command.code.ts"
import type { SeatTurnState } from "akasha/seat-system/seat-turn-state/seat-turn-state.module.code.ts"
import { optionalEnv } from "akasha/utils/narrow/require-env/require-env.module.code.ts"
import { z } from "zod"

const ROOT = "/nowhere"

const ANSWERED = z.object({ colors: z.record(z.string(), z.string()) }).strict()

function parseColorsAnswered(said: string): { readonly colors: Record<string, string> } {
  return ANSWERED.parse(JSON.parse(said))
}

function givenIn(): Given {
  return {
    root: ROOT,
    calledAs: "akasha agent turn-colors",
    from: ROOT,
    writer: null,
    agentId: null,
  }
}

function rootWith(color: string): string {
  const at = mkdtempSync(join("/var/tmp", "agent-turn-color-list-test-"))
  mkdirSync(join(at, dirname(WORKING_PAGE)), { recursive: true })
  colorIn(at, color)
  return at
}

const STATE = turnState.said

test("bare words are agent ids", () => {
  const said = agentTurnColorList(["01a0-one", "01a0-two"], givenIn())

  expect(said.refusals).toEqual([])
  expect(parseColorsAnswered(said.report[0] ?? "")).toEqual({ colors: {} })
})

test("a call naming nothing asks about no agent at all", () => {
  const said = agentTurnColorList([], givenIn())

  expect(said.refusals).toEqual([])
  expect(parseColorsAnswered(said.report[0] ?? "")).toEqual({ colors: {} })
})

test("`--state` is repeatable", () => {
  const root = rootWith("chartreuse")
  const was = optionalEnv(ROOT_NAMED)
  try {
    process.env[ROOT_NAMED] = root
    const said = agentTurnColorList([STATE, "working", STATE, "stopped"], givenIn())

    expect(said.refusals).toEqual([])
    expect(parseColorsAnswered(said.report[0] ?? "")).toEqual({
      colors: { working: "chartreuse" },
    })
  } finally {
    if (was === undefined) delete process.env[ROOT_NAMED]
    else process.env[ROOT_NAMED] = was
    rmSync(root, { recursive: true, force: true })
  }
})

test("ids and states are never asked for together", () => {
  const said = agentTurnColorList([STATE, "working", "01a0-one"], givenIn())

  expect(said.refusals[0]).toContain("never said together")
})

test("a name no turn state carries is refused rather than left out", () => {
  const said = agentTurnColorList([STATE, "nope"], givenIn())

  expect(said.refusals[0]).toContain("nope names no turn state")
})

test("every name no turn state carries is named rather than the first of them alone", () => {
  expect(wrongIn(["nope", "working", "elsewhere"]) ?? "").toContain("nope elsewhere")
})

test("`--state` naming nothing after it is refused", () => {
  const said = agentTurnColorList([STATE], givenIn())

  expect(said.refusals[0]).toContain("takes a value, and none follows it")
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
  const said = parseColorsAnswered(colorsSaid({ working: "green" }))

  expect(Object.keys(said)).toEqual(["colors"])
  expect(said.colors).toEqual({ working: "green" })
})

test("a word this does not take refuses as a fault in the call", () => {
  const said = agentTurnColorList(["--json"], givenIn())

  expect(said.code).toBe(1)
  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("`--json`")
})

test("an id no seat ever held is left out rather than refused", () => {
  const said = agentTurnColorList(["01a00000-0000-7000-8000-00000000000a"], givenIn())

  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(parseColorsAnswered(said.report[0] ?? "")).toEqual({ colors: {} })
})

test("a color rewritten under this command is the color it next answers", () => {
  const root = rootWith("chartreuse")
  const was = optionalEnv(ROOT_NAMED)
  try {
    process.env[ROOT_NAMED] = root
    const first = agentTurnColorList([STATE, "working"], givenIn())

    expect(first.refusals).toEqual([])
    expect(parseColorsAnswered(first.report[0] ?? "")).toEqual({
      colors: { working: "chartreuse" },
    })

    colorIn(root, "vermilion")
    const second = agentTurnColorList([STATE, "working"], givenIn())

    expect(parseColorsAnswered(second.report[0] ?? "")).toEqual({
      colors: { working: "vermilion" },
    })
  } finally {
    if (was === undefined) delete process.env[ROOT_NAMED]
    else process.env[ROOT_NAMED] = was
    rmSync(root, { recursive: true, force: true })
  }
})

test("a reader keeping its answer says the old color, which that comparison catches", () => {
  const said: Record<string, string> = { working: "chartreuse" }
  let held: string | null = null
  const keeping = (state: SeatTurnState): string | null => (held ??= said[state] ?? null)

  expect(colorsOfStates(["working"], keeping)).toEqual({ working: "chartreuse" })
  said["working"] = "vermilion"

  expect(colorsOfStates(["working"], keeping)).toEqual({ working: "chartreuse" })
})
