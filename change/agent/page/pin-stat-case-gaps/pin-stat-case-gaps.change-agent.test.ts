import { expect, test } from "bun:test"
import { pinStatCaseGapsCommand } from "akasha/change/agent/page/pin-stat-case-gaps/pin-stat-case-gaps.change-agent.code.ts"
import { NOTHING_OVER, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { statCaseText } from "akasha/temper/player/character/stat/modules/stat-case/stat-case.module.code.ts"

const CASES_AT = "temper/player/character/stat/temper-stat-case/pages"

const PAGE_AT = `${CASES_AT}/erin-tank/erin-tank.temper-stat-case.ts`

const STATS_AT = `${CASES_AT}/erin-tank/erin-tank.temper-stat-case.verified-stats.json`

const READ = {
  character: "erin",
  bar: "primary-weapon-bar" as const,
  buildHash: "ATQI",
  capturedAt: 1791997005,
  esoVersion: "eso.live.12.1.6.3309674",
  inCombat: false,
  activeBuffs: [],
  championPoints: [],
}

const TEXT = statCaseText({
  ...READ,
  pinned: { "health-maximum": 32651, "stamina-maximum": 26071 },
  gaps: { "bash-cost": 614, "stamina-dodge-cost": 3811 },
})

function worldOf(text: string): World {
  const listedAt = (kind: string, slug: string): readonly { readonly path: string }[] =>
    kind === "temper-stat-case" && slug === "erin-tank" ? [{ path: PAGE_AT }] : []
  return {
    root: "/nowhere",
    index: Object.assign({} as World["index"], { listedAt }),
    textOf: (path) => (path === STATS_AT ? text : null),
    bodyOf: () => null,
    under: () => [],
    base: () => null,
    over: NOTHING_OVER,
  }
}

test("a gap named is pinned among the pinned stats in order and leaves the gaps", () => {
  const said = pinStatCaseGapsCommand(worldOf(TEXT), {
    stat: "stamina-dodge-cost",
    cases: "erin-tank\n",
  })
  const edit = said.edits[0]

  expect(said.refused).toBeNull()
  expect(edit?.kind === "replace" ? edit.path : "").toBe(STATS_AT)
  expect(edit?.kind === "replace" ? edit.contentTo : "").toBe(
    statCaseText({
      ...READ,
      pinned: {
        "health-maximum": 32651,
        "stamina-dodge-cost": 3811,
        "stamina-maximum": 26071,
      },
      gaps: { "bash-cost": 614 },
    })
  )
})

test("a case keeping no gap for the stat is refused", () => {
  const said = pinStatCaseGapsCommand(worldOf(TEXT), { stat: "sneak-cost", cases: "erin-tank" })

  expect(said.refused ?? "").toMatch(/keeps no gap/)
})

test("a slug naming no case is refused", () => {
  const said = pinStatCaseGapsCommand(worldOf(TEXT), {
    stat: "stamina-dodge-cost",
    cases: "nobody",
  })

  expect(said.refused ?? "").toMatch(/names no stat case/)
})

test("a case not written as a case is written is refused", () => {
  const said = pinStatCaseGapsCommand(worldOf(`${TEXT}\n`), {
    stat: "stamina-dodge-cost",
    cases: "erin-tank",
  })

  expect(said.refused ?? "").toMatch(/not written as a case is written/)
})

test("a call naming no stat is refused", () => {
  const said = pinStatCaseGapsCommand(worldOf(TEXT), { cases: "erin-tank" })

  expect(said.refused).not.toBeNull()
})
