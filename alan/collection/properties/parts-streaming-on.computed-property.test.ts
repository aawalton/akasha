import { expect, test } from "bun:test"
import type { Collection } from "akasha/alan/collection/collection.page-type.types.ts"
import { work } from "akasha/alan/collection/properties/parts-streaming-on.computed-property.code.ts"
import type { PartsStreamingOn } from "akasha/alan/collection/properties/parts-streaming-on.computed-property.types.ts"
import { awardWinningMovies } from "akasha/alan/collection/watching/show-collection/pages/award-winning-movies.show-collection.ts"
import { crunchyroll } from "akasha/alan/collection/watching/streaming-service/pages/crunchyroll.streaming-service.ts"
import { hboMax } from "akasha/alan/collection/watching/streaming-service/pages/hbo-max.streaming-service.ts"
import { hulu } from "akasha/alan/collection/watching/streaming-service/pages/hulu.streaming-service.ts"
import { netflix } from "akasha/alan/collection/watching/streaming-service/pages/netflix.streaming-service.ts"
import { streamingService } from "akasha/alan/collection/watching/streaming-service/streaming-service.page-type.ts"
import type { Reach } from "akasha/page/computed-property/computed-property.page-type.ts"

const NETFLIX = `${streamingService.slug}/${netflix.slug}`

const CRUNCHYROLL = `${streamingService.slug}/${crunchyroll.slug}`

const HULU = `${streamingService.slug}/${hulu.slug}`

const HBO_MAX = `${streamingService.slug}/${hboMax.slug}`

type Held = Collection & {
  readonly streamingOn?: readonly string[]
  readonly partsStreamingOn?: PartsStreamingOn
  readonly completion?: string
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
  [SHOW]: { ...BASE, partOfCollections: [FRANCHISE], streamingOn: [NETFLIX, CRUNCHYROLL] },
  [MOVIE]: { ...BASE, partOfCollections: [FANDOM], streamingOn: [HULU, CRUNCHYROLL] },
  [SPECIAL]: { ...BASE, partOfCollections: [FANDOM] },
}

test("a collection's parts stream on every service of every collection under it, however deep", () => {
  expect(servicesOf(PAGES, FANDOM)).toEqual([
    { service: CRUNCHYROLL },
    { service: HULU },
    { service: NETFLIX },
  ])
})

test("a part's own services count beside its parts' services", () => {
  const pages = {
    ...PAGES,
    [FRANCHISE]: { ...BASE, partOfCollections: [FANDOM], streamingOn: [HBO_MAX] },
  }
  expect(servicesOf(pages, FANDOM)).toEqual([
    { service: CRUNCHYROLL },
    { service: HBO_MAX },
    { service: HULU },
    { service: NETFLIX },
  ])
})

test("a completed part's services are left out, and an unfinished part's stay", () => {
  const pages = {
    ...PAGES,
    [MOVIE]: { ...PAGES[MOVIE], completion: "completed" } as Held,
  }
  expect(servicesOf(pages, FANDOM)).toEqual([{ service: CRUNCHYROLL }, { service: NETFLIX }])
})

test("a collection whose only parts with services are completed states no service", () => {
  const pages = {
    [FANDOM]: BASE,
    [MOVIE]: { ...BASE, partOfCollections: [FANDOM], streamingOn: [HULU], completion: "completed" },
  } as Readonly<Record<string, Held>>
  expect(servicesOf(pages, FANDOM)).toBeNull()
})

test("a collection's own services are not its parts' services", () => {
  expect(servicesOf(PAGES, SHOW)).toBeNull()
})

test("a collection whose parts stream on no service states no service", () => {
  const pages = { [FANDOM]: BASE, [SPECIAL]: { ...BASE, partOfCollections: [FANDOM] } }
  expect(servicesOf(pages, FANDOM)).toBeNull()
})
