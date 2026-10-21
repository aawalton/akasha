import { expect, test } from "bun:test"
import { INPUT } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  comparedSkillsOf,
  skillLines,
  tallyLine,
  tallyOf,
  temperTooltipCompare,
} from "akasha/command/pages/temper/tooltip-compare/temper-tooltip-compare.command.code.ts"
import { codeRoot } from "akasha/page/modules/code-root/code-root.module.code.ts"

const ROOT = codeRoot()

const GIVEN: Given = {
  root: ROOT,
  calledAs: "akasha temper tooltip-compare",
  from: ROOT,
  writer: null,
  agentId: null,
}

const BRAWLER = 38754

const EQUATIONS = new Map([
  [
    BRAWLER,
    [
      "<<1>> = 0.1 MaxStat + 1 MaxPower (Ultimate, Dmg, Physical)",
      "<<2>> = 6 seconds (Constant)",
      "<<3>> = Major Resolve (Constant)",
    ],
  ],
  [20816, ["<<1>> = 0.1 MaxStat (Dmg)"]],
])

function skill(abilityId: number, name: string, description: string) {
  return {
    slot: 3,
    abilityId,
    name,
    description,
    durationMs: 0,
    castMs: 0,
    channeled: false,
    cooldownMs: 0,
  }
}

const READING = {
  capturedAt: 1760896298,
  esoVersion: "11.1",
  inCombat: false,
  stats: { "magicka-maximum": 10000, "stamina-maximum": 20000, "power-spell": 3000 },
  skills: [
    skill(BRAWLER, "Brawler", "dealing |cffffff5000|r Physical Damage for |cffffff7|r seconds"),
    skill(20816, "Flame Lash", "dealing |cffffff2000|r and |cffffff9|r more"),
    skill(1, "Nothing Known", "dealing |cffffff1|r"),
  ],
}

test("each slotted skill's tooltip numbers are set beside Temper's from the reading's stats", () => {
  const [brawler, lash, unknown] = comparedSkillsOf(READING, EQUATIONS, new Set())

  expect(brawler?.pairing).toEqual({
    paired: true,
    numbers: [
      {
        placeholder: 1,
        equation: EQUATIONS.get(BRAWLER)?.[0] ?? "",
        scaled: true,
        game: 5000,
        temper: 5000,
      },
      {
        placeholder: 2,
        equation: EQUATIONS.get(BRAWLER)?.[1] ?? "",
        scaled: false,
        game: 7,
        temper: 6,
      },
    ],
  })
  expect(lash?.pairing).toEqual({ paired: false, shown: [2000, 9], equations: 1 })
  expect(unknown?.pairing).toBeNull()
})

test("a reading counts the numbers matched, the skills unpaired and those with no equations", () => {
  const tally = tallyOf(comparedSkillsOf(READING, EQUATIONS, new Set()))

  expect(tally).toEqual({ numbers: 2, matched: 1, unpaired: 1, unmodelled: 1 })
  expect(tallyLine(tally)).toBe(
    "  1 of 2 tooltip numbers match, 1 skills unpaired, 1 with no equations"
  )
})

test("an exact number is marked, and each line says the gap and whether it scales", () => {
  const [brawler, lash, unknown] = comparedSkillsOf(READING, EQUATIONS, new Set()).map(skillLines)

  expect(brawler?.[0]).toBe(`  Brawler (${String(BRAWLER)})`)
  expect(brawler?.[1]).toMatch(/^ {4}= <<1>> +5000 +5000 +0 {2}scaled$/)
  expect(brawler?.[2]).toMatch(/^ {4} {2}<<2>> +7 +6 +-1 {2}constant$/)
  expect(lash).toEqual([
    "  Flame Lash (20816): unpaired, the tooltip shows 2 numbers and the equations name 1",
  ])
  expect(unknown).toEqual(["  Nothing Known (1): Temper holds no equations for it"])
})

test("a character naming no page is refused", async () => {
  const said = await temperTooltipCompare(["nobody-at-all"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("`nobody-at-all` names no character page")
})

test("a call naming no character is refused", async () => {
  const said = await temperTooltipCompare([], GIVEN)

  expect(said.code).toBe(INPUT)
})

test("a reading named both by when it was captured and by its id is refused", async () => {
  const said = await temperTooltipCompare(
    ["nobody-at-all", "--captured-at", "1760896298", "--id", "01a155"],
    GIVEN
  )

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).not.toContain("names no character page")
})
