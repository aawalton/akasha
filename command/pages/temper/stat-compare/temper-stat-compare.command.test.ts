import { expect, test } from "bun:test"
import { INPUT } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { unsteadyOf } from "akasha/command/pages/temper/stat-compare/modules/unsteady-recovery/unsteady-recovery.module.code.ts"
import {
  advancedSheetLines,
  characterSheetLines,
  headerOf,
  rowLine,
  temperStatCompare,
} from "akasha/command/pages/temper/stat-compare/temper-stat-compare.command.code.ts"
import { codeRoot } from "akasha/page/modules/code-root/code-root.module.code.ts"
import { dragonknight } from "akasha/temper/catalog/skill/temper-class/pages/dragonknight.temper-class.ts"
import { imperial } from "akasha/temper/catalog/world/temper-race/pages/imperial.temper-race.ts"
import {
  FETE_LAG_MS,
  isUnsettled,
} from "akasha/temper/player/character/stat/modules/fete-unsettled/fete-unsettled.module.code.ts"

const ROOT = codeRoot()

const GIVEN: Given = {
  root: ROOT,
  calledAs: "akasha temper stat-compare",
  from: ROOT,
  writer: null,
  agentId: null,
}

test("a character is named as a word, and one naming no page is refused", async () => {
  const said = await temperStatCompare(["nobody-at-all"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("`nobody-at-all` names no character page")
})

test("a character is named at its flag as well", async () => {
  const said = await temperStatCompare(["--character", "nobody-at-all"], GIVEN)

  expect(said.refusals.join("\n")).toContain("`nobody-at-all` names no character page")
})

test("a call naming no character is refused", async () => {
  const said = await temperStatCompare([], GIVEN)

  expect(said.code).toBe(INPUT)
})

test("a count of readings that is no whole number is refused", async () => {
  const said = await temperStatCompare(["nobody-at-all", "--last", "some"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).not.toContain("names no character page")
})

const LINE = {
  id: "01a155aa-0000-7000-8000-000000000000",
  result: "r",
  character: "Erin Solstice",
  buildHash: "",
  bar: "frontBar" as const,
  reading: { capturedAt: 1760896298, esoVersion: "11.1", inCombat: false, stats: {} },
}

test("a reading's header names the race and class its build holds", () => {
  const built = { race: imperial.slug, class: dragonknight.slug }
  expect(headerOf(LINE, built)).toContain(`frontBar  ${imperial.slug} ${dragonknight.slug}  eso`)
})

test("a reading whose build does not decode says so in its header", () => {
  expect(headerOf(LINE, null)).toContain("frontBar  build unread  eso")
})

test("a reading's advanced stats are shown as the game gave them, with no estimate", () => {
  const reading = {
    ...LINE.reading,
    advancedSheet: {
      "physical-resist": { format: "percent" as const, percent: 31.5 },
      armor: { format: "flat" as const, flat: 18200 },
    },
  }
  const lines = advancedSheetLines(reading)

  expect(lines[0]).toBe("  advanced (game): 2 stats")
  expect(lines[1]).not.toContain("temper")
  expect(lines[2]).toMatch(/^ {4}armor +flat +18200 +-$/)
  expect(lines[3]).toMatch(/^ {4}physical-resist +percent +- +31\.5$/)
})

test("a reading's advanced stats are grouped under the panel's categories with the panel's names", () => {
  const reading = {
    ...LINE.reading,
    advancedSheet: {
      "spell-resist": {
        category: "Mitigation",
        label: "Spell Resistance",
        format: "flat-or-percent" as const,
        flat: 19072,
        percent: 28.9,
      },
      "critical-chance": {
        category: "Damage",
        label: "Critical Chance",
        format: "flat-or-percent" as const,
        flat: 4267,
        percent: 19.5,
      },
      "all-xp": { category: "", label: "Experience", format: "percent" as const, percent: 10 },
    },
  }
  const lines = advancedSheetLines(reading)

  expect(lines[0]).toBe("  advanced (game): 3 stats")
  expect(lines[2]).toBe("   (no header)")
  expect(lines[3]).toMatch(/^ {4}all-xp +percent +- +10 {2}Experience$/)
  expect(lines[4]).toBe("   Damage")
  expect(lines[5]).toMatch(/^ {4}critical-chance +flat-or-percent +4267 +19\.5 {2}Critical Chance$/)
  expect(lines[6]).toBe("   Mitigation")
  expect(lines[7]).toMatch(/^ {4}spell-resist +flat-or-percent +19072 +28\.9 {2}Spell Resistance$/)
})

test("a reading keeping no advanced stats says so", () => {
  expect(advancedSheetLines(LINE.reading)).toEqual(["  advanced (game): none kept"])
})

test("a reading's other character sheet numbers are shown by name", () => {
  const reading = {
    ...LINE.reading,
    sheet: { "critical-chance-spell": 19.47, "attribute-points-health": 64 },
  }
  const lines = characterSheetLines(reading)

  expect(lines[0]).toBe("  sheet (game)")
  expect(lines[1]).toMatch(/^ {4}attribute-points-health +64$/)
  expect(lines[2]).toMatch(/^ {4}critical-chance-spell +19\.47$/)
})

test("a reading keeping no sheet numbers says so", () => {
  expect(characterSheetLines(LINE.reading)).toEqual(["  sheet (game): none kept"])
})

test("stamina recovery read while blocking or moving is marked as no steady value", () => {
  const moving = { ...LINE.reading, moving: true }
  const blocking = { ...LINE.reading, blocking: true, moving: true }

  expect(unsteadyOf(moving, "stamina-recovery")).toBe("moving")
  expect(unsteadyOf(blocking, "stamina-recovery")).toBe("blocking")
  expect(unsteadyOf(moving, "stamina-maximum")).toBeNull()
  expect(unsteadyOf(LINE.reading, "stamina-recovery")).toBeNull()
  const zero = { ...LINE.reading, stats: { "stamina-recovery": 0 } }
  expect(unsteadyOf(zero, "stamina-recovery")).toBe("0 with no blocking or moving kept")
  expect(unsteadyOf({ ...zero, blocking: false, moving: false }, "stamina-recovery")).toBeNull()
  const row = {
    stat: "stamina-recovery",
    game: 0,
    estimate: 514,
    unsteady: "moving",
    unsettled: false,
  }
  expect(rowLine(row, 16)).toMatch(/^ {2}~ stamina-recovery +0 +514 +\+514 {2}moving, not steady$/)
})

test("a maximum stat read under 3.3 seconds after Fete changed is marked unsettled", () => {
  const lately = { stacks: 30, changedMsAgo: 800 }

  expect(isUnsettled("stamina-maximum", lately)).toBe(true)
  expect(isUnsettled("magicka-maximum", { stacks: 6, changedMsAgo: 3075 })).toBe(true)
  expect(isUnsettled("health-maximum", lately)).toBe(true)
  expect(isUnsettled("stamina-recovery", lately)).toBe(false)
  expect(isUnsettled("stamina-maximum", { stacks: 30, changedMsAgo: FETE_LAG_MS })).toBe(false)
  expect(isUnsettled("stamina-maximum", { stacks: 30 })).toBe(false)
  expect(isUnsettled("stamina-maximum", undefined)).toBe(false)
  const row = {
    stat: "stamina-maximum",
    game: 84424,
    estimate: 84336,
    unsteady: null,
    unsettled: true,
  }
  expect(rowLine(row, 15)).toMatch(
    /^ {2}~ stamina-maximum +84424 +84336 +-88 {2}Fete changed lately, unsettled$/
  )
})

test("a reading named both by when it was captured and by its id is refused", async () => {
  const said = await temperStatCompare(
    ["nobody-at-all", "--captured-at", "1760896298", "--id", "01a155"],
    GIVEN
  )

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).not.toContain("names no character page")
})
