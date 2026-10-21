import { beforeAll, expect, test } from "bun:test"
import { addStatCaseStatsCommand } from "akasha/change/agent/page/add-stat-case-stats/add-stat-case-stats.change-agent.code.ts"
import { NOTHING_OVER, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { loadMetricCatalog } from "akasha/temper/player/character/stat/modules/metric-catalog-loading/metric-catalog-loading.module.code.ts"
import { statCaseText } from "akasha/temper/player/character/stat/modules/stat-case/stat-case.module.code.ts"

const TYPE_AT = "temper/player/character/stat/temper-stat-case/temper-stat-case.page-type.ts"

const CASES_AT = "temper/player/character/stat/temper-stat-case/pages"

const PAGE_AT = `${CASES_AT}/erin-tank/erin-tank.temper-stat-case.ts`

const STATS_AT = `${CASES_AT}/erin-tank/erin-tank.temper-stat-case.verified-stats.json`

const CHARACTER_AT =
  "temper/player/character/temper-account-character/pages/erin/erin.temper-account-character.ts"

const READINGS_AT =
  "temper/player/character/temper-account-character/pages/erin/erin.temper-account-character.readings.jsonl"

const FLAME = "defense-flame-mitigation"

const FROST = "defense-frost-mitigation"

const FLAME_GAME = 16.968181610107422

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

const TEXT = statCaseText({ ...READ, pinned: { "health-maximum": 32651 }, gaps: {} })

const LINE = JSON.stringify({
  id: "01a15c05-2f22-7f3e-ae4d-06009162c9b4",
  buildHash: "ATQI",
  bar: "frontBar",
  reading: {
    capturedAt: 1791997005,
    advancedSheet: {
      "fire-resist": { format: "flat-or-percent", flat: 11199, percent: FLAME_GAME },
      "frost-resist": { format: "flat-or-percent", flat: 11199, percent: FLAME_GAME },
    },
  },
})

function worldOf(text: string, lines: string): World {
  const listedAt = (kind: string, slug: string): readonly { readonly path: string }[] => {
    if (kind === "temper-stat-case" && slug === "erin-tank") return [{ path: PAGE_AT }]
    if (kind === "temper-account-character" && slug === "erin") return [{ path: CHARACTER_AT }]
    if (kind === "page-type" && slug === "temper-stat-case") return [{ path: TYPE_AT }]
    return []
  }
  const texts: Record<string, string> = { [STATS_AT]: text, [READINGS_AT]: lines }
  return {
    root: "/nowhere",
    index: Object.assign({} as World["index"], { listedAt }),
    textOf: (path) => texts[path] ?? null,
    bodyOf: () => null,
    under: (folder) => (folder === CASES_AT ? [PAGE_AT, STATS_AT] : []),
    base: () => null,
    over: NOTHING_OVER,
  }
}

const FLAME_ESTIMATE = Math.fround(FLAME_GAME / 100)

function estimateGiven(): (stat: string) => number {
  return (stat) => (stat === FLAME ? FLAME_ESTIMATE : 0)
}

beforeAll(async () => {
  await loadMetricCatalog()
})

test("a stat the estimate gives is pinned and one it misses is kept as a gap", () => {
  const said = addStatCaseStatsCommand(
    worldOf(TEXT, `${LINE}\n`),
    { stats: `${FLAME}\n${FROST}\n`, cases: "erin-tank" },
    estimateGiven
  )
  const edit = said.edits[0]

  expect(said.refused).toBeNull()
  expect(edit?.kind === "replace" ? edit.contentTo : "").toBe(
    statCaseText({
      ...READ,
      pinned: { [FLAME]: FLAME_GAME, "health-maximum": 32651 },
      gaps: { [FROST]: FLAME_GAME },
    })
  )
})

test("with no case named, every case is reached", () => {
  const said = addStatCaseStatsCommand(worldOf(TEXT, `${LINE}\n`), { stats: FLAME }, estimateGiven)

  expect(said.edits.map((one) => (one.kind === "replace" ? one.path : ""))).toEqual([STATS_AT])
})

test("a reading whose build hash was written again is still the case's reading", () => {
  const rewritten = LINE.replace('"buildHash":"ATQI"', '"buildHash":"ATQN"')
  const said = addStatCaseStatsCommand(
    worldOf(TEXT, `${rewritten}\n`),
    { stats: FLAME },
    estimateGiven
  )

  expect(said.edits.length).toBe(1)
})

test("a stat the case holds already is left as it is", () => {
  const held = statCaseText({ ...READ, pinned: {}, gaps: { [FLAME]: 1 } })
  const said = addStatCaseStatsCommand(worldOf(held, `${LINE}\n`), { stats: FLAME }, estimateGiven)

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([])
})

test("a case whose reading is not found is left as it is and named", () => {
  const said = addStatCaseStatsCommand(worldOf(TEXT, ""), { stats: FLAME }, estimateGiven)

  expect(said.edits).toEqual([])
  expect(said.told?.join("\n") ?? "").toContain("erin-tank")
})

test("a slug naming no case is refused", () => {
  const said = addStatCaseStatsCommand(
    worldOf(TEXT, `${LINE}\n`),
    { stats: FLAME, cases: "nobody" },
    estimateGiven
  )

  expect(said.refused ?? "").toMatch(/names no stat case/)
})

test("a call naming no stat is refused", () => {
  const said = addStatCaseStatsCommand(
    worldOf(TEXT, `${LINE}\n`),
    { cases: "erin-tank" },
    estimateGiven
  )

  expect(said.refused).not.toBeNull()
})
