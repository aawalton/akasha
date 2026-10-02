import { expect, test } from "bun:test"
import {
  REMOVE_FILE,
  REPLACE,
} from "akasha/command/pages/story/tell/modules/tell-continuing/tell-continuing.module.code.ts"
import {
  askedFor,
  bodyTelling,
  GAME_MASTER,
  knowersFor,
  type Reading,
  type Taken,
  taken,
  toldIn,
} from "akasha/command/pages/story/tell/story-tell.command.code.ts"
import { lore } from "akasha/story/lore/lore.page-type.ts"
import { characterOther } from "akasha/story/world/characters/character-other/character-other.page-type.ts"

const CALLED = "akasha story tell"

const HER = `${characterOther.slug}/grove-keeper`

const PAGE = `${lore.slug}/grove`

const BODY = [
  'import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"',
  "",
  "export const grove = {",
  '  id: "01a0d600-0000-7000-8000-000000000009",',
  '  type: "page-type/lore",',
  '  slug: "grove",',
  '  title: "Grove",',
  '  world: "world/held",',
  `  about: "${HER}",`,
  '  secrets: "jsonl",',
  "} as const satisfies Lore",
  "",
].join("\n")

test("a call names the page, the fact and each knower", () => {
  const read = taken(["--page", PAGE, "--fact", "It rains.", "--knower", HER], CALLED)
  expect(read).toEqual({
    page: PAGE,
    fact: "It rains.",
    knowers: [HER],
    adds: false,
    drafts: false,
  })
})

test("a call naming no knower tells the game master alone", () => {
  const read = taken(["--page", PAGE, "--fact", "It rains."], CALLED)
  expect(read).toEqual({ page: PAGE, fact: "It rains.", knowers: [], adds: false, drafts: false })
  expect(knowersFor([])).toEqual([GAME_MASTER])
})

test("a call saying --draft drafts rather than lands", () => {
  const read = taken(["--page", PAGE, "--fact", "It rains.", "--draft"], CALLED)
  expect(read).toEqual({ page: PAGE, fact: "It rains.", knowers: [], adds: false, drafts: true })
})

test("a call saying --new-fact adds a fact the page holds nowhere", () => {
  const read = taken(["--page", PAGE, "--fact", "It rains.", "--new-fact"], CALLED)
  expect(read).toEqual({ page: PAGE, fact: "It rains.", knowers: [], adds: true, drafts: false })
})

const AT = "story/world/pages/held/lore/grove.lore.ts"

const SECRETS_AT = "story/world/pages/held/lore/grove.lore.secrets.jsonl"

const HER_AT = "story/world/pages/held/characters/grove-keeper.character-other.ts"

function readingOf(bodies: Map<string, string>, facts: readonly unknown[]): Reading {
  return {
    listedAt: (pageTypeSlug, slug) => {
      if (`${pageTypeSlug}/${slug}` === PAGE) return [{ path: AT }]
      return `${pageTypeSlug}/${slug}` === HER ? [{ path: HER_AT }] : []
    },
    valueAt: (path) => (path === AT ? { facts: [...facts] } : null),
    textOf: (path) => bodies.get(path) ?? null,
    shaped: (_path, text) => text,
  }
}

test("a tell drafts the page as the landing's formatter lays it out", () => {
  const bodies = new Map([
    [AT, BODY],
    [SECRETS_AT, '"one"\n'],
  ])
  const reading = { ...readingOf(bodies, []), shaped: (_path: string, _text: string) => "laid\n" }
  const asked = askedFor(tellOf("one"), reading)
  if (typeof asked === "string") throw new Error(asked)
  const given = asked[0]?.given ?? {}
  const old = String(Reflect.get(given, "old"))
  expect(BODY.replace(old, () => String(Reflect.get(given, "new")))).toBe("laid\n")
})

const LISTED = [
  'import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"',
  "",
  "export const grove = {",
  '  slug: "grove",',
  '  world: "world/held",',
  "  facts: [",
  `    { fact: "one", knowers: ["${GAME_MASTER}"] },`,
  `    { fact: "two", knowers: ["${GAME_MASTER}"] },`,
  "  ],",
  "} as const satisfies Lore",
  "",
].join("\n")

function laidOut(_path: string, text: string): string {
  return text.replace(/facts: \[(.*)\],/, (_all, inner: string) => {
    const records = inner.split(/(?<=\}), /).map((one) => `    ${one},\n`)
    return `facts: [\n${records.join("")}  ],`
  })
}

test("a new fact's edit replaces only the lines it changes, so a later change elsewhere leaves it fitting", () => {
  const facts = [
    { fact: "one", knowers: [GAME_MASTER] },
    { fact: "two", knowers: [GAME_MASTER] },
  ]
  const reading = { ...readingOf(new Map([[AT, LISTED]]), facts), shaped: laidOut }
  const asked = askedFor(tellOf("three", [], true), reading)
  if (typeof asked === "string") throw new Error(asked)
  const given = asked[0]?.given ?? {}
  const old = String(Reflect.get(given, "old"))
  expect(old).not.toContain("two")
  const changed = LISTED.replace('"two"', '"two, since changed"').replace(
    "  facts: [\n",
    `  facts: [\n    { fact: "zero", knowers: ["${GAME_MASTER}"] },\n`
  )
  const landed = changed.replace(old, () => String(Reflect.get(given, "new")))
  expect(landed).toContain('"two, since changed"')
  expect(landed).toContain('"zero"')
  expect(landed.indexOf('"three"')).toBeGreaterThan(landed.indexOf('"two, since changed"'))
})

function tellOf(fact: string, knowers: readonly string[] = [HER], adds = false): Taken {
  return { page: PAGE, fact, knowers, adds, drafts: true }
}

test("a new fact is told onto the page and leaves the secrets file untouched", () => {
  const bodies = new Map([
    [AT, BODY],
    [SECRETS_AT, '"one"\n'],
  ])
  const asked = askedFor(tellOf("It rains.", [HER], true), readingOf(bodies, []))
  if (typeof asked === "string") throw new Error(asked)
  expect(asked.map((one) => Reflect.get(one.given, "at"))).toEqual([AT])
  expect(JSON.stringify(asked)).toContain(
    `fact: \\"It rains.\\", knowers: [\\"${GAME_MASTER}\\", \\"${HER}\\"]`
  )
})

test("a new fact that reads as a secret word for word tells that secret", () => {
  const bodies = new Map([
    [AT, BODY],
    [SECRETS_AT, '"one"\n"two"\n'],
  ])
  const asked = askedFor(tellOf("two", [HER], true), readingOf(bodies, []))
  if (typeof asked === "string") throw new Error(asked)
  expect(asked.map((one) => Reflect.get(one.given, "at"))).toEqual([AT, SECRETS_AT])
})

test("a tell reads the page and its secrets through the reading it is given", () => {
  const bodies = new Map([
    [AT, BODY],
    [SECRETS_AT, '"one"\n"two"\n'],
  ])
  const asked = askedFor(tellOf("two"), readingOf(bodies, []))
  expect(typeof asked).not.toBe("string")
  const said = JSON.stringify(asked)
  expect(said).toContain(`fact: \\"two\\", knowers: [\\"${GAME_MASTER}\\", \\"${HER}\\"]`)
  expect(said).toContain('"old":"\\"two\\"\\n","new":""')
})

test("a second tell over a reading holding the first keeps both facts told", () => {
  const first = { fact: "one", knowers: [GAME_MASTER, HER] }
  const bodies = new Map([
    [AT, BODY],
    [SECRETS_AT, '"two"\n'],
  ])
  const asked = askedFor(tellOf("two"), readingOf(bodies, [first]))
  const said = JSON.stringify(asked)
  expect(said).toContain('fact: \\"one\\"')
  expect(said).toContain('fact: \\"two\\"')
})

test("a tell rewrites the page in place and never takes the page away", () => {
  const bodies = new Map([
    [AT, BODY],
    [SECRETS_AT, '"one"\n"two"\n'],
  ])
  const asked = askedFor(tellOf("two"), readingOf(bodies, []))
  if (typeof asked === "string") throw new Error(asked)
  expect(asked.map((one) => one.at)).toEqual([REPLACE, REPLACE])
  expect(asked.map((one) => Reflect.get(one.given, "at"))).toEqual([AT, SECRETS_AT])
})

test("a tell leaving the secrets as they were touches the page alone", () => {
  const first = { fact: "one", knowers: [GAME_MASTER] }
  const bodies = new Map([
    [AT, BODY],
    [SECRETS_AT, '"two"\n'],
  ])
  const asked = askedFor(tellOf("one"), readingOf(bodies, [first]))
  if (typeof asked === "string") throw new Error(asked)
  expect(asked.map((one) => Reflect.get(one.given, "at"))).toEqual([AT])
})

test("the last secret told takes the secrets file away", () => {
  const bodies = new Map([
    [AT, BODY],
    [SECRETS_AT, '"one"\n'],
  ])
  const asked = askedFor(tellOf("one"), readingOf(bodies, []))
  if (typeof asked === "string") throw new Error(asked)
  expect(asked.at(-1)).toEqual({ at: REMOVE_FILE, given: { at: SECRETS_AT } })
})

test("a tell drafted over a reading refuses a fact that page does not hold", () => {
  const bodies = new Map([[AT, BODY]])
  expect(typeof askedFor(tellOf("none"), readingOf(bodies, []))).toBe("string")
})

test("a tell naming a knower no page answers to is refused", () => {
  const bodies = new Map([
    [AT, BODY],
    [SECRETS_AT, '"one"\n'],
  ])
  const asked = askedFor(tellOf("one", ["character-other/nobody"]), readingOf(bodies, []))
  expect(typeof asked).toBe("string")
})

test("the game master is a knower whenever a character is", () => {
  expect(knowersFor([HER])).toEqual([GAME_MASTER, HER])
  expect(knowersFor([HER, GAME_MASTER, HER])).toEqual([GAME_MASTER, HER])
})

test("a secret told leaves the secrets for the facts, with the game master", () => {
  const now = toldIn({ told: [], secrets: ["one", "two"] }, "two", [HER])
  expect(now).toEqual({ told: [{ fact: "two", knowers: [GAME_MASTER, HER] }], secrets: ["one"] })
})

test("a fact already told gains the knowers it lacks and loses none", () => {
  const was = { told: [{ fact: "one", knowers: [GAME_MASTER] }], secrets: [] }
  expect(toldIn(was, "one", [HER])).toEqual({
    told: [{ fact: "one", knowers: [GAME_MASTER, HER] }],
    secrets: [],
  })
  expect(typeof toldIn(was, "one", [])).toBe("string")
})

test("a fact the page does not hold is refused", () => {
  expect(typeof toldIn({ told: [], secrets: ["one"] }, "none", [])).toBe("string")
})

test("a fact said to be new is told, and the secrets stay as they were", () => {
  expect(toldIn({ told: [], secrets: ["one"] }, "none", [HER], true)).toEqual({
    told: [{ fact: "none", knowers: [GAME_MASTER, HER] }],
    secrets: ["one"],
  })
})

test("a new fact longer than a fact may run is refused", () => {
  const long = "x".repeat(101)
  const said = toldIn({ told: [], secrets: [] }, long, [], true)
  expect(String(said)).toContain("at most 100")
  expect(String(said)).not.toContain("secret")
})

test("a secret longer than a fact may run is refused rather than told", () => {
  const long = "x".repeat(101)
  const said = toldIn({ told: [], secrets: [long] }, long, [])
  expect(typeof said).toBe("string")
  expect(String(said)).toContain("at most 100")
  expect(typeof toldIn({ told: [], secrets: ["x".repeat(100)] }, "x".repeat(100), [])).toBe(
    "object"
  )
})

test("the page's last secret told takes its secrets key away and states its facts", () => {
  const body = bodyTelling("grove.lore.ts", BODY, {
    told: [{ fact: "two", knowers: [GAME_MASTER] }],
    secrets: [],
  })
  expect(body).not.toContain("secrets:")
  expect(body).toContain(`facts: [{ fact: "two", knowers: ["${GAME_MASTER}"] }]`)
})

test("a page keeping secrets keeps its secrets key", () => {
  const body = bodyTelling("grove.lore.ts", BODY, {
    told: [{ fact: "two", knowers: [GAME_MASTER] }],
    secrets: ["one"],
  })
  expect(body).toContain('secrets: "jsonl"')
})
