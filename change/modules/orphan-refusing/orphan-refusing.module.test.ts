import { expect, test } from "bun:test"
import { orphanAt } from "akasha/change/modules/orphan-refusing/orphan-refusing.module.code.ts"
import { NOTHING_OVER, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import type { Listed } from "akasha/page/index/modules/reading/index-reading.module.code.ts"

const OLD_PAGE = "akasha/mana/pages/nala.one-mana.ts"

const OLD_HISTORY = "akasha/mana/pages/nala.one-mana.history.jsonl"

const NEW_PAGE = "akasha/manas/nala.character-mana.ts"

const LEVEL_PAGE = "akasha/levels/nala.character-level.ts"

const ID = "01a0c000-0000-7000-8000-000000000001"

type Held = {
  readonly now?: Readonly<Record<string, string>>
  readonly before?: Readonly<Record<string, string>>
  readonly listed?: Readonly<Record<string, readonly string[]>>
  readonly ids?: Readonly<Record<string, string>>
  readonly carrying?: Readonly<Record<string, readonly string[]>>
}

function worldOf(held: Held): World {
  const listing = (paths: readonly string[] | undefined): readonly Listed[] =>
    (paths ?? []).map((path) => ({ path, id: ID }))
  const carrying = held.carrying ?? {}
  const index = Object.assign({} as World["index"], {
    pageTypesIn: () => new Set(Object.keys(carrying)),
    filePropertiesAt: () =>
      new Map(
        Object.entries(carrying).map(([kind, slugs]) => [
          kind,
          new Map(slugs.map((one) => [one, null])),
        ])
      ),
    listedAt: (kind: string, slug: string) => listing(held.listed?.[`${kind}/${slug}`]),
    listedById: (id: string) => {
      const path = held.ids?.[id]
      return path === undefined ? null : { path, id }
    },
  })
  const now = held.now ?? {}
  return {
    root: "/nowhere",
    index,
    textOf: (path) => now[path] ?? null,
    bodyOf: (path) => now[path] ?? null,
    under: () => [],
    base: (path) => held.before?.[path] ?? now[path] ?? null,
    over: NOTHING_OVER,
  }
}

test("a first file beside a page that is there is no orphan", () => {
  expect(orphanAt(worldOf({ now: { [OLD_PAGE]: "" } }), OLD_HISTORY)).toBeNull()
})

test("a path that already holds a body is no orphan", () => {
  expect(orphanAt(worldOf({ now: { [OLD_HISTORY]: "{}\n" } }), OLD_HISTORY)).toBeNull()
})

test("a path naming no page beside it is no orphan", () => {
  expect(orphanAt(worldOf({}), "akasha/one/held.jsonl")).toBeNull()
  expect(orphanAt(worldOf({}), "akasha/one/held.module.ts")).toBeNull()
})

test("a file beside a page that is not there is refused by the name of that page", () => {
  const said = orphanAt(worldOf({}), OLD_HISTORY) ?? ""

  expect(said).toContain(`\`${OLD_PAGE}\``)
  expect(said).not.toContain("now at")
})

test("a page the change moved is found by the id the files beneath hold", () => {
  const world = worldOf({
    before: { [OLD_PAGE]: `export const nala = {\n  id: "${ID}",\n}\n` },
    ids: { [ID]: NEW_PAGE },
  })

  expect(orphanAt(world, OLD_HISTORY)).toContain(`the page is now at \`${NEW_PAGE}\``)
})

test("a page moved under the same type is found by its slug", () => {
  const world = worldOf({ listed: { "one-mana/nala": [NEW_PAGE] } })

  expect(orphanAt(world, OLD_HISTORY)).toContain(`the page is now at \`${NEW_PAGE}\``)
})

test("a page whose type changed is found among pages of its slug carrying the file", () => {
  const world = worldOf({
    carrying: { "character-mana": ["history"], "character-level": ["history"], other: [] },
    listed: {
      "character-mana/nala": [NEW_PAGE],
      "character-level/nala": [LEVEL_PAGE],
      "other/nala": ["akasha/other/nala.other.ts"],
    },
  })
  const said = orphanAt(world, OLD_HISTORY) ?? ""

  expect(said).toContain(`\`${LEVEL_PAGE}\`, \`${NEW_PAGE}\``)
  expect(said).not.toContain("nala.other.ts")
})
