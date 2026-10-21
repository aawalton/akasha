import { expect, test } from "bun:test"
import { pinTooltipCaseCommand } from "akasha/change/agent/page/pin-tooltip-case/pin-tooltip-case.change-agent.code.ts"
import { NOTHING_OVER, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"

const CHARACTER_AT =
  "temper/player/character/temper-account-character/pages/erin/erin.temper-account-character.ts"

const READINGS_AT =
  "temper/player/character/temper-account-character/pages/erin/erin.temper-account-character.readings.jsonl"

const TYPE_AT = "temper/player/character/stat/temper-tooltip-case/temper-tooltip-case.page-type.ts"

const CASES_AT = "temper/player/character/stat/temper-tooltip-case/pages"

const EQUATIONS = new Map([
  [
    38754,
    ["<<1>> = 0.1 MaxStat + 1 MaxPower (Ultimate, Dmg, Physical)", "<<2>> = 6 seconds (Constant)"],
  ],
])

function skill(slot: number, abilityId: number, name: string, description: string) {
  return {
    slot,
    abilityId,
    name,
    description,
    durationMs: 0,
    castMs: 0,
    channeled: false,
    cooldownMs: 0,
  }
}

const FRONT_READING = {
  capturedAt: 1791997005,
  esoVersion: "eso.live.12.1.6.3309674",
  inCombat: false,
  stats: { "stamina-maximum": 20000, "power-weapon": 3000, "magicka-maximum": 10000 },
  skills: {
    "1": skill(4, 20816, "Flame Lash", "dealing |cffffff2000|r"),
    "2": skill(3, 38754, "Brawler", "dealing |cffffff5000|r for |cffffff7|r seconds"),
  },
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
  reading: { ...FRONT_READING, capturedAt: 1791997100 },
}

const BACK = {
  id: "01a1cccc-0000-7000-8000-000000000003",
  result: "three",
  character: "Erin",
  buildHash: "ATQK",
  bar: "backBar",
  reading: { ...FRONT_READING, capturedAt: 1791997050, skills: {} },
}

const UNVERSIONED = {
  id: "01a1dddd-0000-7000-8000-000000000004",
  result: "four",
  character: "Erin",
  buildHash: "ATQI",
  bar: "frontBar",
  reading: { ...FRONT_READING, capturedAt: 1791996000, esoVersion: undefined },
}

const READINGS = `${[FRONT, NEWER_FRONT, BACK, UNVERSIONED].map((one) => JSON.stringify(one)).join("\n")}\n`

function worldOf(cases: readonly string[]): World {
  const listedAt = (kind: string, slug: string): readonly { readonly path: string }[] => {
    if (kind === "page-type" && slug === "temper-tooltip-case") return [{ path: TYPE_AT }]
    if (kind === "temper-account-character" && slug === "erin") return [{ path: CHARACTER_AT }]
    if (kind === "temper-tooltip-case" && cases.includes(slug))
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

type Said = ReturnType<typeof pinTooltipCaseCommand>

function pathsOf(said: Said): readonly string[] {
  return said.edits.map((one) => (one.kind === "add" ? one.path : ""))
}

function tooltipsOf(said: Said) {
  const tooltips = said.edits[1]
  return JSON.parse(tooltips?.kind === "add" ? tooltips.content : "{}")
}

function casePaths(slug: string): readonly string[] {
  return [
    `${CASES_AT}/${slug}/${slug}.temper-tooltip-case.ts`,
    `${CASES_AT}/${slug}/${slug}.temper-tooltip-case.verified-tooltips.json`,
  ]
}

test("with no reading picked, the newest line of the bar is answered as a case page", () => {
  const said = pinTooltipCaseCommand(worldOf([]), { character: "erin", bar: "front" }, EQUATIONS)

  expect(said.refused).toBeNull()
  expect(pathsOf(said)).toEqual(casePaths("erin-front-bar-2026-10-14-1658"))
  expect(tooltipsOf(said).capturedAt).toBe(1791997100)
})

test("a case keeps each slotted skill's tooltip in slot order, and pins what Temper gives", () => {
  const said = pinTooltipCaseCommand(
    worldOf([]),
    { character: "erin", reading: "01a1aaaa" },
    EQUATIONS
  )
  const body = tooltipsOf(said)

  expect(body.bar).toBe("primary-weapon-bar")
  expect(body.esoVersion).toBe("eso.live.12.1.6.3309674")
  expect(body.skills.map((one: { name: string }) => one.name)).toEqual(["Brawler", "Flame Lash"])
  expect(Object.keys(body.stats)).toEqual(["magicka-maximum", "power-weapon", "stamina-maximum"])
  expect(body.pinned).toEqual({ "38754 <<1>>": 5000 })
  expect(body.gaps).toEqual({ "38754 <<2>>": 7 })
})

test("a case keeps the passives its build holds, in name order", () => {
  const passivesOf = (hash: string) => (hash === "ATQI" ? ["dark-veil", "agility"] : undefined)
  const said = pinTooltipCaseCommand(
    worldOf([]),
    { character: "erin", reading: "01a1aaaa" },
    EQUATIONS,
    passivesOf
  )

  expect(tooltipsOf(said).passives).toEqual(["agility", "dark-veil"])
})

test("a reading keeping no slotted skill is refused", () => {
  const said = pinTooltipCaseCommand(worldOf([]), { character: "erin", bar: "back" }, EQUATIONS)

  expect(said.refused ?? "").toMatch(/keeps no slotted skill/)
})

test("a pick matching more than one reading is refused", () => {
  const said = pinTooltipCaseCommand(worldOf([]), { character: "erin", reading: "01a1" }, EQUATIONS)

  expect(said.refused ?? "").toMatch(/names 4 readings/)
})

test("a pick no reading matches is refused", () => {
  const said = pinTooltipCaseCommand(
    worldOf([]),
    { character: "erin", reading: "1700000000" },
    EQUATIONS
  )

  expect(said.refused ?? "").toMatch(/holds no reading/)
})

test("a slug some case is named already is refused", () => {
  const said = pinTooltipCaseCommand(
    worldOf(["erin-tank"]),
    { character: "erin", bar: "front", slug: "erin-tank" },
    EQUATIONS
  )

  expect(said.refused ?? "").toMatch(/a case already/)
})

test("a reading that records no game version is refused", () => {
  const said = pinTooltipCaseCommand(
    worldOf([]),
    { character: "erin", reading: "1791996000" },
    EQUATIONS
  )

  expect(said.refused ?? "").toMatch(/records no game version/)
})

test("a call naming neither a reading nor a bar is refused, and so is a bar that is neither", () => {
  expect(
    pinTooltipCaseCommand(worldOf([]), { character: "erin" }, EQUATIONS).refused
  ).not.toBeNull()
  expect(
    pinTooltipCaseCommand(worldOf([]), { character: "erin", bar: "side" }, EQUATIONS).refused ?? ""
  ).toMatch(/is no bar/)
})

test("a character naming no page is refused", () => {
  const said = pinTooltipCaseCommand(worldOf([]), { character: "nobody", bar: "front" }, EQUATIONS)

  expect(said.refused ?? "").toMatch(/names no character page/)
})
