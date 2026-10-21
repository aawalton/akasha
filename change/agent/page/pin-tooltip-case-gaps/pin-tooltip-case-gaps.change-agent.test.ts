import { expect, test } from "bun:test"
import { pinTooltipCaseGapsCommand } from "akasha/change/agent/page/pin-tooltip-case-gaps/pin-tooltip-case-gaps.change-agent.code.ts"
import { NOTHING_OVER, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { tooltipCaseText } from "akasha/temper/player/character/stat/modules/tooltip-case/tooltip-case.module.code.ts"

const CASES_AT = "temper/player/character/stat/temper-tooltip-case/pages"

const PAGE_AT = `${CASES_AT}/erin-front/erin-front.temper-tooltip-case.ts`

const TOOLTIPS_AT = `${CASES_AT}/erin-front/erin-front.temper-tooltip-case.verified-tooltips.json`

const OTHER_AT = `${CASES_AT}/erin-back/erin-back.temper-tooltip-case.ts`

const OTHER_TOOLTIPS_AT = `${CASES_AT}/erin-back/erin-back.temper-tooltip-case.verified-tooltips.json`

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
  gaps: { "38754 <<2>>": 7, "38754 <<3>>": 50 },
})

const OTHER = tooltipCaseText({ ...READ, pinned: { "38754 <<1>>": 5000 }, gaps: {} })

function worldOf(text: string): World {
  const listedAt = (kind: string, slug: string): readonly { readonly path: string }[] =>
    kind === "temper-tooltip-case" && slug === "erin-front" ? [{ path: PAGE_AT }] : []
  const texts: Record<string, string> = { [TOOLTIPS_AT]: text, [OTHER_TOOLTIPS_AT]: OTHER }
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

const every = () => [
  { path: PAGE_AT, slug: "erin-front" },
  { path: OTHER_AT, slug: "erin-back" },
]

const MOVED = tooltipCaseText({
  ...READ,
  pinned: { "38754 <<1>>": 5000, "38754 <<2>>": 7 },
  gaps: { "38754 <<3>>": 50 },
})

test("a gap named is pinned among the pinned numbers in order and leaves the gaps", () => {
  const said = pinTooltipCaseGapsCommand(worldOf(TEXT), {
    formula: "38754 <<2>>",
    cases: "erin-front\n",
  })
  const edit = said.edits[0]

  expect(said.refused).toBeNull()
  expect(edit?.kind === "replace" ? edit.path : "").toBe(TOOLTIPS_AT)
  expect(edit?.kind === "replace" ? edit.contentTo : "").toBe(MOVED)
})

test("with no cases named, every case keeping the gap is changed and the rest are left", () => {
  const said = pinTooltipCaseGapsCommand(worldOf(TEXT), { formula: "38754 <<2>>" }, every)

  expect(said.refused).toBeNull()
  expect(said.edits.map((one) => (one.kind === "replace" ? one.path : ""))).toEqual([TOOLTIPS_AT])
})

test("a gap no case keeps is refused when no case is named", () => {
  const said = pinTooltipCaseGapsCommand(worldOf(TEXT), { formula: "1 <<1>>" }, every)

  expect(said.refused ?? "").toMatch(/no tooltip case keeps a gap/)
})

test("a case named keeping no gap for the number is refused", () => {
  const said = pinTooltipCaseGapsCommand(worldOf(TEXT), {
    formula: "38754 <<1>>",
    cases: "erin-front",
  })

  expect(said.refused ?? "").toMatch(/keeps no gap/)
})

test("a slug naming no case is refused", () => {
  const said = pinTooltipCaseGapsCommand(worldOf(TEXT), { formula: "38754 <<2>>", cases: "nobody" })

  expect(said.refused ?? "").toMatch(/names no tooltip case/)
})

test("a case not written as a case is written is refused", () => {
  const said = pinTooltipCaseGapsCommand(worldOf(`${TEXT}\n`), {
    formula: "38754 <<2>>",
    cases: "erin-front",
  })

  expect(said.refused ?? "").toMatch(/not written as a case is written/)
})

test("a call naming no number is refused", () => {
  const said = pinTooltipCaseGapsCommand(worldOf(TEXT), { cases: "erin-front" })

  expect(said.refused).not.toBeNull()
})
