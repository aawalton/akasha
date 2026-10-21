import { expect, test } from "bun:test"
import { restateTooltipCasesCommand } from "akasha/change/agent/page/restate-tooltip-cases/restate-tooltip-cases.change-agent.code.ts"
import { NOTHING_OVER, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { tooltipCaseText } from "akasha/temper/player/character/stat/modules/tooltip-case/tooltip-case.module.code.ts"

const CHARACTER_AT =
  "temper/player/character/temper-account-character/pages/erin/erin.temper-account-character.ts"

const READINGS_AT =
  "temper/player/character/temper-account-character/pages/erin/erin.temper-account-character.readings.jsonl"

const CASES_AT = "temper/player/character/stat/temper-tooltip-case/pages"

const PAGE_AT = `${CASES_AT}/erin-front/erin-front.temper-tooltip-case.ts`

const TOOLTIPS_AT = `${CASES_AT}/erin-front/erin-front.temper-tooltip-case.verified-tooltips.json`

const READ = {
  character: "erin",
  bar: "primary-weapon-bar" as const,
  capturedAt: 1791997005,
  esoVersion: "eso.live.12.1.6.3309674",
  stats: { "stamina-maximum": 20000 },
  skills: [{ abilityId: 38754, name: "Brawler", description: "|cffffff5000|r |cffffff7|r" }],
}

const TEXT = tooltipCaseText({
  ...READ,
  pinned: { "38754 <<1>>": 5000 },
  gaps: { "38754 <<2>>": 7 },
})

const LINE = {
  id: "01a1aaaa-0000-7000-8000-000000000001",
  buildHash: "ATQI",
  bar: "frontBar",
  reading: {
    capturedAt: 1791997005,
    inCombat: false,
    stats: { "stamina-maximum": 20000 },
    activeBuffs: [{ abilityId: 61665, name: "Major Brutality" }],
    championPoints: [{ championSkillId: 22, points: 30, maxPoints: 50 }],
    skills: [
      {
        slot: 3,
        abilityId: 38754,
        name: "Brawler",
        description: "|cffffff5000|r |cffffff7|r",
        durationMs: 6000,
        castMs: 0,
        channeled: false,
        cooldownMs: 0,
      },
    ],
  },
}

const BACK_LINE = { ...LINE, id: "01a1bbbb-0000-7000-8000-000000000002", bar: "backBar" }

function worldOf(lines: readonly object[], text = TEXT): World {
  const listedAt = (kind: string, slug: string): readonly { readonly path: string }[] => {
    if (kind === "temper-account-character" && slug === "erin") return [{ path: CHARACTER_AT }]
    if (kind === "temper-tooltip-case" && slug === "erin-front") return [{ path: PAGE_AT }]
    return []
  }
  const texts: Record<string, string> = {
    [TOOLTIPS_AT]: text,
    [READINGS_AT]: `${lines.map((one) => JSON.stringify(one)).join("\n")}\n`,
  }
  return {
    root: "/nowhere",
    index: Object.assign({} as World["index"], { listedAt }),
    textOf: (path) => texts[path] ?? null,
    bodyOf: () => null,
    under: () => [],
    base: () => null,
    over: NOTHING_OVER,
  }
}

const heldOf = (hash: string) =>
  hash === "ATQI" ? { passives: ["agility"], stars: ["deadly-aim"], mediumPieces: 7 } : undefined

const every = () => [{ path: PAGE_AT, slug: "erin-front" }]

test("a case takes what its build and reading held and keeps its stats, pins and gaps", () => {
  const said = restateTooltipCasesCommand(worldOf([BACK_LINE, LINE]), {}, heldOf, every)
  const edit = said.edits[0]

  expect(said.refused).toBeNull()
  expect(edit?.kind === "replace" ? edit.path : "").toBe(TOOLTIPS_AT)
  expect(edit?.kind === "replace" ? edit.contentTo : "").toBe(
    tooltipCaseText({
      character: READ.character,
      bar: READ.bar,
      capturedAt: READ.capturedAt,
      esoVersion: READ.esoVersion,
      stats: READ.stats,
      passives: ["agility"],
      stars: ["deadly-aim"],
      buffs: ["Major Brutality"],
      championPoints: { mighty: 30, "war-mage": 0 },
      mediumPieces: 7,
      skills: READ.skills.map((one) => ({ ...one, durationMs: 6000 })),
      pinned: { "38754 <<1>>": 5000 },
      gaps: { "38754 <<2>>": 7 },
    })
  )
})

test("a number a case kept neither pinned nor as a gap is added, and a kept number stays", () => {
  const text = tooltipCaseText({ ...READ, pinned: { "38754 <<1>>": 5000 }, gaps: {} })
  const equations = new Map([[38754, ["<<1>> = 4000 (Constant)", "<<2>> = 7 (Constant)"]]])
  const said = restateTooltipCasesCommand(
    worldOf([LINE], text),
    {},
    () => undefined,
    every,
    () => equations
  )
  const edit = said.edits[0]
  const written = JSON.parse(edit?.kind === "replace" ? edit.contentTo : "{}")

  expect(written.pinned).toEqual({ "38754 <<1>>": 5000, "38754 <<2>>": 7 })
  expect(written.gaps).toEqual({})
})

test("a case whose reading is not on its bar is refused", () => {
  const said = restateTooltipCasesCommand(worldOf([BACK_LINE]), { cases: "erin-front" }, heldOf)

  expect(said.refused ?? "").toMatch(/does not hold/)
})

test("a case already holding what its reading held answers no edit", () => {
  const bare = { ...LINE, reading: { capturedAt: 1791997005, inCombat: false, stats: {} } }
  const said = restateTooltipCasesCommand(worldOf([bare]), {}, () => undefined, every)

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([])
})

test("a slug naming no case is refused", () => {
  const said = restateTooltipCasesCommand(worldOf([LINE]), { cases: "nobody" }, heldOf)

  expect(said.refused ?? "").toMatch(/names no tooltip case/)
})
