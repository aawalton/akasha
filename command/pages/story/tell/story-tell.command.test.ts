import { expect, test } from "bun:test"
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
  expect(read).toEqual({ page: PAGE, fact: "It rains.", knowers: [HER], drafts: false })
})

test("a call naming no knower tells the game master alone", () => {
  const read = taken(["--page", PAGE, "--fact", "It rains."], CALLED)
  expect(read).toEqual({ page: PAGE, fact: "It rains.", knowers: [], drafts: false })
  expect(knowersFor([])).toEqual([GAME_MASTER])
})

test("a call saying --draft drafts rather than lands", () => {
  const read = taken(["--page", PAGE, "--fact", "It rains.", "--draft"], CALLED)
  expect(read).toEqual({ page: PAGE, fact: "It rains.", knowers: [], drafts: true })
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
  }
}

function tellOf(fact: string, knowers: readonly string[] = [HER]): Taken {
  return { page: PAGE, fact, knowers, drafts: true }
}

test("a tell reads the page and its secrets through the reading it is given", () => {
  const bodies = new Map([
    [AT, BODY],
    [SECRETS_AT, '"one"\n"two"\n'],
  ])
  const asked = askedFor(tellOf("two"), readingOf(bodies, []))
  expect(typeof asked).not.toBe("string")
  const said = JSON.stringify(asked)
  expect(said).toContain(`fact: \\"two\\", knowers: [\\"${GAME_MASTER}\\", \\"${HER}\\"]`)
  expect(said).toContain('\\"one\\"\\n')
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
