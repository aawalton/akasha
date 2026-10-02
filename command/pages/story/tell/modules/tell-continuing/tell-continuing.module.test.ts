import { expect, test } from "bun:test"
import { CEILING } from "akasha/check/code/pages/file-length/modules/length-ceiling/length-ceiling.module.code.ts"
import {
  ADD_FILE,
  continuationBody,
  fits,
  REMOVE_FILE,
  REPLACE,
} from "akasha/command/pages/story/tell/modules/tell-continuing/tell-continuing.module.code.ts"
import {
  askedFor,
  GAME_MASTER,
  type Reading,
  type Taken,
} from "akasha/command/pages/story/tell/story-tell.command.code.ts"

const HER = "character-other/grove-keeper"

const WORLD = "world/held"

const WORLD_AT = "story/world/pages/held/held.world.ts"

const LORE_AT = "story/world/pages/held/lore"

const AT = `${LORE_AT}/grove.lore.ts`

const SECOND_AT = `${LORE_AT}/grove-2.lore.ts`

const THIRD_AT = `${LORE_AT}/grove-3.lore.ts`

const PLACE_AT = "story/world/pages/held/places/glade.place.ts"

function bodyOf(slug: string): string {
  return [
    'import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"',
    "",
    `export const held = {`,
    `  slug: "${slug}",`,
    `  world: "${WORLD}",`,
    "} as const satisfies Lore",
    "",
  ].join("\n")
}

type Held = { readonly path: string; readonly value: Record<string, unknown> }

function readingOver(pages: Record<string, Held>, full: readonly string[]): Reading {
  const byPath = new Map(Object.values(pages).map((one) => [one.path, one.value]))
  return {
    listedAt: (pageTypeSlug, slug) => {
      const one = pages[`${pageTypeSlug}/${slug}`]
      return one === undefined ? [] : [{ path: one.path }]
    },
    valueAt: (path) => byPath.get(path) ?? null,
    textOf: (path) => (byPath.has(path) ? bodyOf(path) : null),
    shaped: (path, text) => (full.includes(path) ? `${text}${"x".repeat(CEILING)}` : text),
  }
}

const GROVE = { title: "Grove", world: WORLD, about: HER }

const PAGES: Record<string, Held> = {
  [WORLD]: { path: WORLD_AT, value: {} },
  [HER]: { path: "story/world/pages/held/characters/grove-keeper.character-other.ts", value: {} },
  "lore/grove": { path: AT, value: GROVE },
}

function tellOf(page: string, fact: string, adds = true): Taken {
  return { page, fact, knowers: [HER], adds, drafts: true }
}

function addedIn(asked: ReturnType<typeof askedFor>): { at: string; body: string } {
  if (typeof asked === "string") throw new Error(asked)
  const one = asked[0]
  expect(one?.at).toBe(ADD_FILE)
  return {
    at: String(Reflect.get(one?.given ?? {}, "at")),
    body: String(Reflect.get(one?.given ?? {}, "body")),
  }
}

test("a body over the ceiling does not fit, and one at it does", () => {
  expect(fits("x".repeat(CEILING))).toBe(true)
  expect(fits("x".repeat(CEILING + 1))).toBe(false)
})

test("a new fact the full page has no room for opens a continuation about the same target", () => {
  const added = addedIn(askedFor(tellOf("lore/grove", "It rains."), readingOver(PAGES, [AT])))
  expect(added.at).toBe(SECOND_AT)
  expect(added.body).toContain('slug: "grove-2"')
  expect(added.body).toContain('title: "Grove, continued"')
  expect(added.body).toContain(`world: "${WORLD}"`)
  expect(added.body).toContain(`about: "${HER}"`)
  expect(added.body).toContain(`{ fact: "It rains.", knowers: ["${GAME_MASTER}", "${HER}"] }`)
  expect(added.body).toContain("export const grove2 = {")
})

test("the newest continuation with room takes the fact", () => {
  const pages = { ...PAGES, "lore/grove-2": { path: SECOND_AT, value: GROVE } }
  const asked = askedFor(tellOf("lore/grove", "It rains."), readingOver(pages, [AT]))
  if (typeof asked === "string") throw new Error(asked)
  expect(asked.map((one) => one.at)).toEqual([REPLACE])
  expect(Reflect.get(asked[0]?.given ?? {}, "at")).toBe(SECOND_AT)
})

test("a full newest continuation opens the next one", () => {
  const pages = { ...PAGES, "lore/grove-2": { path: SECOND_AT, value: GROVE } }
  const added = addedIn(
    askedFor(tellOf("lore/grove", "It rains."), readingOver(pages, [AT, SECOND_AT]))
  )
  expect(added.at).toBe(THIRD_AT)
  expect(added.body).toContain('slug: "grove-3"')
})

test("a page of the next slug about another target is passed over", () => {
  const other = { title: "Grove Two", world: WORLD, about: WORLD }
  const pages = { ...PAGES, "lore/grove-2": { path: SECOND_AT, value: other } }
  const added = addedIn(askedFor(tellOf("lore/grove", "It rains."), readingOver(pages, [AT])))
  expect(added.at).toBe(THIRD_AT)
})

test("a full place continues on a lore page about that place, in its world's lore folder", () => {
  const pages = {
    ...PAGES,
    "place/glade": { path: PLACE_AT, value: { title: "Glade", world: WORLD } },
  }
  const added = addedIn(
    askedFor(tellOf("place/glade", "Moss grows."), readingOver(pages, [PLACE_AT]))
  )
  expect(added.at).toBe(`${LORE_AT}/glade-2.lore.ts`)
  expect(added.body).toContain('about: "place/glade"')
  expect(added.body).toContain('title: "Glade, continued"')
})

test("a new fact the page has room for stays on the page", () => {
  const asked = askedFor(tellOf("lore/grove", "It rains."), readingOver(PAGES, []))
  if (typeof asked === "string") throw new Error(asked)
  expect(Reflect.get(asked[0]?.given ?? {}, "at")).toBe(AT)
})

test("a fact already told on a full page gains its knower there rather than moving", () => {
  const told = { ...GROVE, facts: [{ fact: "It rains.", knowers: [GAME_MASTER] }] }
  const pages = { ...PAGES, "lore/grove": { path: AT, value: told } }
  const asked = askedFor(tellOf("lore/grove", "It rains.", false), readingOver(pages, [AT]))
  if (typeof asked === "string") throw new Error(asked)
  expect(asked.map((one) => one.at)).toEqual([REPLACE])
  expect(Reflect.get(asked[0]?.given ?? {}, "at")).toBe(AT)
})

const SECRETS_AT = `${LORE_AT}/grove.lore.secrets.jsonl`

function keepingSecrets(pages: Record<string, Held>, secrets: string): Reading {
  const reading = readingOver(pages, [AT])
  const body = bodyOf(AT).replace(`  world: "${WORLD}",\n`, `$&  secrets: "jsonl",\n`)
  const held = new Map([
    [AT, body],
    [SECRETS_AT, secrets],
  ])
  return { ...reading, textOf: (path) => held.get(path) ?? reading.textOf(path) }
}

test("the last secret told on a full page leaves its secrets for a continuation", () => {
  const asked = askedFor(tellOf("lore/grove", "one", false), keepingSecrets(PAGES, '"one"\n'))
  if (typeof asked === "string") throw new Error(asked)
  const added = addedIn(asked)
  expect(added.at).toBe(SECOND_AT)
  expect(added.body).toContain(`{ fact: "one", knowers: ["${GAME_MASTER}", "${HER}"] }`)
  expect(asked.slice(1).map((one) => [one.at, Reflect.get(one.given, "at")])).toEqual([
    [REMOVE_FILE, SECRETS_AT],
    [REPLACE, AT],
  ])
  expect(String(Reflect.get(asked[2]?.given ?? {}, "old"))).toContain("secrets:")
  expect(String(Reflect.get(asked[2]?.given ?? {}, "new"))).not.toContain("secrets:")
})

test("a secret told on a full page goes onto the continuation that has room", () => {
  const pages = { ...PAGES, "lore/grove-2": { path: SECOND_AT, value: GROVE } }
  const asked = askedFor(
    tellOf("lore/grove", "one", false),
    keepingSecrets(pages, '"one"\n"two"\n')
  )
  if (typeof asked === "string") throw new Error(asked)
  expect(asked.map((one) => [one.at, Reflect.get(one.given, "at")])).toEqual([
    [REPLACE, SECOND_AT],
    [REPLACE, SECRETS_AT],
  ])
  expect(JSON.stringify(asked[0])).toContain('fact: \\"one\\"')
})

test("a continuation's body states no id, so the landing gives it one", () => {
  const told = { fact: "It rains.", knowers: [GAME_MASTER] }
  const body = continuationBody({
    slug: "grove-2",
    titled: "Grove, continued",
    world: WORLD,
    target: HER,
    told,
  })
  expect(body).not.toContain("id:")
  expect(body).toContain('type: "page-type/lore"')
})
