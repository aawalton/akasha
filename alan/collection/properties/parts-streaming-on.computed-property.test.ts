import { expect, test } from "bun:test"
import type { Collection } from "akasha/alan/collection/collection.page-type.types.ts"
import { work } from "akasha/alan/collection/properties/parts-streaming-on.computed-property.code.ts"
import type { PartsStreamingOn } from "akasha/alan/collection/properties/parts-streaming-on.computed-property.types.ts"
import { awardWinningMovies } from "akasha/alan/collection/watching/show-collection/pages/award-winning-movies.show-collection.ts"
import type { Reach } from "akasha/page/computed-property/computed-property.page-type.ts"

type Held = Collection & {
  readonly streamingOn?: readonly string[]
  readonly partsStreamingOn?: PartsStreamingOn
}

const FANDOM = "fandom/fandom"

const FRANCHISE = "franchise/franchise"

const SHOW = "show/show"

const MOVIE = "movie/movie"

const SPECIAL = "movie/special"

const BASE: Held = { ...awardWinningMovies, partOfCollections: [] }

function reachFor(pages: Readonly<Record<string, Held>>, address: string): Reach {
  const parts = (): readonly Held[] =>
    Object.entries(pages)
      .filter(([, one]) => (one.partOfCollections ?? []).includes(address))
      .map(([at, one]) => ({
        ...one,
        partsStreamingOn: work(one, reachFor(pages, at)) ?? undefined,
      }))
  return {
    target: () => null,
    through: () => null,
    naming: <Named>() => parts() as readonly Named[],
    file: () => null,
    folder: () => null,
  }
}

function servicesOf(
  pages: Readonly<Record<string, Held>>,
  address: string
): PartsStreamingOn | null {
  return work(pages[address] ?? BASE, reachFor(pages, address))
}

const PAGES: Readonly<Record<string, Held>> = {
  [FANDOM]: BASE,
  [FRANCHISE]: { ...BASE, partOfCollections: [FANDOM] },
  [SHOW]: { ...BASE, partOfCollections: [FRANCHISE], streamingOn: ["Netflix", "Crunchyroll"] },
  [MOVIE]: { ...BASE, partOfCollections: [FANDOM], streamingOn: ["Hulu", "Crunchyroll"] },
  [SPECIAL]: { ...BASE, partOfCollections: [FANDOM] },
}

test("a collection's parts stream on every service of every collection under it, however deep", () => {
  expect(servicesOf(PAGES, FANDOM)).toEqual([
    { service: "Crunchyroll" },
    { service: "Hulu" },
    { service: "Netflix" },
  ])
})

test("a part's own services count beside its parts' services", () => {
  const pages = {
    ...PAGES,
    [FRANCHISE]: { ...BASE, partOfCollections: [FANDOM], streamingOn: ["Max"] },
  }
  expect(servicesOf(pages, FANDOM)).toEqual([
    { service: "Crunchyroll" },
    { service: "Hulu" },
    { service: "Max" },
    { service: "Netflix" },
  ])
})

test("a collection's own services are not its parts' services", () => {
  expect(servicesOf(PAGES, SHOW)).toBeNull()
})

test("a collection whose parts stream on no service states no service", () => {
  const pages = { [FANDOM]: BASE, [SPECIAL]: { ...BASE, partOfCollections: [FANDOM] } }
  expect(servicesOf(pages, FANDOM)).toBeNull()
})
