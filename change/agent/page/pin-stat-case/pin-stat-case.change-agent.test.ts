import { expect, test } from "bun:test"
import { pinStatCaseCommand } from "akasha/change/agent/page/pin-stat-case/pin-stat-case.change-agent.code.ts"
import { NOTHING_OVER, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"

const CHARACTER_AT =
  "temper/player/character/temper-account-character/pages/erin/erin.temper-account-character.ts"

const READINGS_AT =
  "temper/player/character/temper-account-character/pages/erin/erin.temper-account-character.readings.jsonl"

const TYPE_AT = "temper/player/character/stat/temper-stat-case/temper-stat-case.page-type.ts"

const CASES_AT = "temper/player/character/stat/temper-stat-case/pages"

const FRONT_READING = {
  capturedAt: 1791997005,
  esoVersion: "eso.live.12.1.6.3309674",
  inCombat: false,
  stats: { "health-maximum": 32651, "resistance-physical": 32382 },
  activeBuffs: [{ abilityId: 61694, name: "Major Resolve" }],
  championPoints: [{ championSkillId: 2, points: 50, maxPoints: 50, bonus: "" }],
}

const FRONT = {
  id: "01a1aaaa-0000-7000-8000-000000000001",
  result: "one",
  character: "Erin",
  buildHash: "ATQI",
  bar: "frontBar",
  reading: FRONT_READING,
}

const NEWER_FRONT = {
  id: "01a1bbbb-0000-7000-8000-000000000002",
  result: "two",
  character: "Erin",
  buildHash: "ATQJ",
  bar: "frontBar",
  reading: {
    ...FRONT_READING,
    capturedAt: 1791997100,
    activeBuffs: {},
    championPoints: {
      "1": { championSkillId: 2, points: 40, maxPoints: 50, bonus: "" },
      "2": { championSkillId: 8, points: 10, maxPoints: 50 },
    },
  },
}

const BACK = {
  id: "01a1cccc-0000-7000-8000-000000000003",
  result: "three",
  character: "Erin",
  buildHash: "ATQK",
  bar: "backBar",
  reading: { ...FRONT_READING, capturedAt: 1791997050 },
}

const UNVERSIONED = {
  id: "01a1dddd-0000-7000-8000-000000000004",
  result: "four",
  character: "Erin",
  buildHash: "ATQI",
  bar: "frontBar",
  reading: { ...FRONT_READING, capturedAt: 1791996000, esoVersion: undefined },
}

const FETE_LATELY = {
  id: "01a2eeee-0000-7000-8000-000000000005",
  result: "five",
  character: "Erin",
  buildHash: "ATQI",
  bar: "frontBar",
  reading: {
    ...FRONT_READING,
    capturedAt: 1791995500,
    stats: { "stamina-maximum": 84424, "health-maximum": 32651, "stamina-recovery": 1386 },
    fete: { stacks: 30, changedMsAgo: 900 },
  },
}

const READINGS = `${[FRONT, NEWER_FRONT, BACK, UNVERSIONED, FETE_LATELY].map((one) => JSON.stringify(one)).join("\n")}\n`

function worldOf(cases: readonly string[]): World {
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
    textOf: (path) => (path === READINGS_AT ? READINGS : null),
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

function pathsOf(said: ReturnType<typeof pinStatCaseCommand>): readonly string[] {
  return said.edits.map((one) => (one.kind === "add" ? one.path : ""))
}

function statsOf(said: ReturnType<typeof pinStatCaseCommand>) {
  const stats = said.edits[1]
  return JSON.parse(stats?.kind === "add" ? stats.content : "{}")
}

function casePaths(slug: string): readonly string[] {
  return [
    `${CASES_AT}/${slug}/${slug}.temper-stat-case.ts`,
    `${CASES_AT}/${slug}/${slug}.temper-stat-case.verified-stats.json`,
  ]
}

test("with no reading picked, the newest line of the bar is answered as a case page", () => {
  const said = pinStatCaseCommand(worldOf([]), { character: "erin", bar: "front" }, pinAll)

  expect(said.refused).toBeNull()
  expect(pathsOf(said)).toEqual(casePaths("erin-front-bar-2026-10-14-1658"))
  expect(statsOf(said).capturedAt).toBe(1791997100)
  expect(statsOf(said).buildHash).toBe("ATQJ")
})

test("buffs and stars a line keeps keyed by number are listed in order", () => {
  const said = pinStatCaseCommand(worldOf([]), { character: "erin", bar: "front" }, pinAll)

  expect(statsOf(said).activeBuffs).toEqual([])
  expect(statsOf(said).championPoints).toEqual([
    { championSkillId: 2, points: 40, maxPoints: 50 },
    { championSkillId: 8, points: 10, maxPoints: 50 },
  ])
})

test("a reading picked by when it was captured is pinned with its own build", () => {
  const said = pinStatCaseCommand(worldOf([]), { character: "erin", reading: "1791997005" }, pinAll)
  const body = statsOf(said)

  expect(pathsOf(said)).toEqual(casePaths("erin-front-bar-2026-10-14-1656"))
  expect(body.bar).toBe("primary-weapon-bar")
  expect(body.buildHash).toBe("ATQI")
  expect(body.esoVersion).toBe("eso.live.12.1.6.3309674")
  expect(body.activeBuffs).toEqual([{ abilityId: 61694, name: "Major Resolve" }])
  expect(body.championPoints).toEqual([{ championSkillId: 2, points: 50, maxPoints: 50 }])
  expect(body.pinned).toEqual({ "health-maximum": 32651 })
  expect(body.gaps).toEqual({ "resistance-physical": 32382 })
})

test("a reading picked by the start of its id takes its bar from the line", () => {
  const said = pinStatCaseCommand(worldOf([]), { character: "erin", reading: "01a1cccc" }, pinAll)

  expect(pathsOf(said)).toEqual(casePaths("erin-back-bar-2026-10-14-1657"))
  expect(statsOf(said).bar).toBe("backup-weapon-bar")
  expect(statsOf(said).buildHash).toBe("ATQK")
})

test("a pick no reading matches is refused", () => {
  const said = pinStatCaseCommand(worldOf([]), { character: "erin", reading: "1700000000" }, pinAll)

  expect(said.refused ?? "").toMatch(/holds no reading/)
})

test("a bar handed in with a pick narrows the pick to that bar", () => {
  const said = pinStatCaseCommand(
    worldOf([]),
    { character: "erin", reading: "1791997005", bar: "back" },
    pinAll
  )

  expect(said.refused ?? "").toMatch(/holds no reading/)
})

test("a pick matching more than one reading is refused", () => {
  const said = pinStatCaseCommand(worldOf([]), { character: "erin", reading: "01a1" }, pinAll)

  expect(said.refused ?? "").toMatch(/names 4 readings/)
})

test("a call naming neither a reading nor a bar is refused", () => {
  const said = pinStatCaseCommand(worldOf([]), { character: "erin" }, pinAll)

  expect(said.refused).not.toBeNull()
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

test("a reading that records no game version is refused", () => {
  const said = pinStatCaseCommand(worldOf([]), { character: "erin", reading: "1791996000" }, pinAll)

  expect(said.refused ?? "").toMatch(/records no game version/)
})

test("a character naming no page is refused", () => {
  const said = pinStatCaseCommand(worldOf([]), { character: "nobody", bar: "front" }, pinAll)

  expect(said.refused ?? "").toMatch(/names no character page/)
})
