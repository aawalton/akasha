import { expect, test } from "bun:test"
import { pinStatCaseCommand } from "akasha/change/agent/page/pin-stat-case/pin-stat-case.change-agent.code.ts"
import { NOTHING_OVER, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"

const CHARACTER_AT =
  "temper/player/character/temper-account-character/pages/erin/erin.temper-account-character.ts"

const COMPLETION_AT =
  "temper/player/character/temper-account-character/pages/erin/erin.temper-account-character.completion.json"

const TYPE_AT = "temper/player/character/stat/temper-stat-case/temper-stat-case.page-type.ts"

const CASES_AT = "temper/player/character/stat/temper-stat-case/pages"

const FRONT_BAR = {
  capturedAt: 1791997005,
  esoVersion: "eso.live.12.1.6.3309674",
  inCombat: false,
  stats: { "health-maximum": 32651, "resistance-physical": 32382 },
  activeBuffs: [{ abilityId: 61694, name: "Major Resolve" }],
  championPoints: [{ championSkillId: 2, points: 50, maxPoints: 50, bonus: "" }],
}

const COMPLETION = JSON.stringify({ buildHash: "ATQI", reportedStats: { frontBar: FRONT_BAR } })

const UNVERSIONED_COMPLETION = JSON.stringify({
  buildHash: "ATQI",
  reportedStats: { frontBar: { ...FRONT_BAR, esoVersion: undefined } },
})

function worldOf(cases: readonly string[], completion: string = COMPLETION): World {
  const listedAt = (kind: string, slug: string): readonly { readonly path: string }[] => {
    if (kind === "page-type" && slug === "temper-stat-case") return [{ path: TYPE_AT }]
    if (kind === "temper-account-character" && slug === "erin") return [{ path: CHARACTER_AT }]
    if (kind === "temper-stat-case" && cases.includes(slug))
      return [{ path: `${CASES_AT}/${slug}` }]
    return []
  }
  return {
    root: "/nowhere",
    index: Object.assign({} as World["index"], { listedAt }),
    textOf: (path) => (path === COMPLETION_AT ? completion : null),
    bodyOf: () => null,
    under: () => [],
    base: () => null,
    over: NOTHING_OVER,
  }
}

const pinAll: Parameters<typeof pinStatCaseCommand>[2] = ({ stats, ...read }) => ({
  ...read,
  championPoints: read.championPoints.map(({ championSkillId, points, maxPoints }) => ({
    championSkillId,
    points,
    maxPoints,
  })),
  pinned: { "health-maximum": stats["health-maximum"] ?? 0 },
  gaps: { "resistance-physical": stats["resistance-physical"] ?? 0 },
})

test("a bar's reading is answered as a case page and its stats beside it", () => {
  const said = pinStatCaseCommand(worldOf([]), { character: "erin", bar: "front" }, pinAll)

  expect(said.refused).toBeNull()
  const paths = said.edits.map((one) => (one.kind === "add" ? one.path : ""))
  const slug = "erin-front-bar-2026-10-14-1656"
  expect(paths).toEqual([
    `${CASES_AT}/${slug}/${slug}.temper-stat-case.ts`,
    `${CASES_AT}/${slug}/${slug}.temper-stat-case.verified-stats.json`,
  ])
})

test("the stats file keeps the buffs and stars listed, and the pinned stats and gaps", () => {
  const said = pinStatCaseCommand(worldOf([]), { character: "erin", bar: "front" }, pinAll)
  const stats = said.edits[1]
  const body = JSON.parse(stats?.kind === "add" ? stats.content : "{}")

  expect(body.bar).toBe("primary-weapon-bar")
  expect(body.esoVersion).toBe("eso.live.12.1.6.3309674")
  expect(body.activeBuffs).toEqual([{ abilityId: 61694, name: "Major Resolve" }])
  expect(body.championPoints).toEqual([{ championSkillId: 2, points: 50, maxPoints: 50 }])
  expect(body.pinned).toEqual({ "health-maximum": 32651 })
  expect(body.gaps).toEqual({ "resistance-physical": 32382 })
})

test("a slug handed in names the case", () => {
  const said = pinStatCaseCommand(
    worldOf([]),
    { character: "erin", bar: "front", slug: "erin-tank" },
    pinAll
  )
  const page = said.edits[0]

  expect(page?.kind === "add" ? page.content : "").toContain('slug: "erin-tank",')
})

test("a slug some case is named already is refused", () => {
  const said = pinStatCaseCommand(
    worldOf(["erin-tank"]),
    { character: "erin", bar: "front", slug: "erin-tank" },
    pinAll
  )

  expect(said.refused ?? "").toMatch(/a case already/)
})

test("a bar that is neither front nor back is refused", () => {
  const said = pinStatCaseCommand(worldOf([]), { character: "erin", bar: "side" }, pinAll)

  expect(said.refused ?? "").toMatch(/is no bar/)
})

test("a bar with no reading is refused", () => {
  const said = pinStatCaseCommand(worldOf([]), { character: "erin", bar: "back" }, pinAll)

  expect(said.refused ?? "").toMatch(/no back bar reading/)
})

test("a reading that records no game version is refused", () => {
  const said = pinStatCaseCommand(
    worldOf([], UNVERSIONED_COMPLETION),
    { character: "erin", bar: "front" },
    pinAll
  )

  expect(said.refused ?? "").toMatch(/records no game version/)
})

test("a character naming no page is refused", () => {
  const said = pinStatCaseCommand(worldOf([]), { character: "nobody", bar: "front" }, pinAll)

  expect(said.refused ?? "").toMatch(/names no character page/)
})
