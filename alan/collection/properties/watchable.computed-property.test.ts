import { expect, test } from "bun:test"
import type { Collection } from "akasha/alan/collection/collection.page-type.types.ts"
import type { PartsStreamingOn } from "akasha/alan/collection/properties/parts-streaming-on.computed-property.types.ts"
import { work } from "akasha/alan/collection/properties/watchable.computed-property.code.ts"
import { awardWinningMovies } from "akasha/alan/collection/watching/show-collection/pages/award-winning-movies.show-collection.ts"
import { streamingService } from "akasha/alan/collection/watching/streaming-service/streaming-service.page-type.ts"
import type { Reach } from "akasha/page/computed-property/computed-property.page-type.ts"

type Service = { readonly slug: string; readonly held: boolean; readonly free: boolean }

const HELD: Service = { slug: "held-one", held: true, free: false }

const FREE: Service = { slug: "free-one", held: false, free: true }

const PAID: Service = { slug: "paid-one", held: false, free: false }

const OTHER: Service = { slug: "paid-two", held: false, free: false }

function addressOf(one: Service): string {
  return `${streamingService.slug}/${one.slug}`
}

const BY_ADDRESS = new Map<string, Service>(
  [HELD, FREE, PAID, OTHER].map((one) => [addressOf(one), one])
)

const REACH: Reach = {
  target: <Held>(slug: string) => (BY_ADDRESS.get(slug) ?? null) as Held | null,
  through: () => null,
  naming: () => [],
  file: () => null,
  folder: () => null,
}

type Worked = Collection & { readonly partsStreamingOn?: PartsStreamingOn }

function on(...services: readonly Service[]): Worked {
  return {
    ...awardWinningMovies,
    partsStreamingOn: services.map((one) => ({ service: addressOf(one) })),
  }
}

test("a collection whose parts stream on a service Alan holds is watchable", () => {
  expect(work(on(PAID, HELD), REACH)).toBe(true)
})

test("a collection whose parts stream on a free service is watchable", () => {
  expect(work(on(FREE, PAID), REACH)).toBe(true)
})

test("a collection whose parts stream only on services neither held nor free is not", () => {
  expect(work(on(PAID, OTHER), REACH)).toBe(false)
})

test("a collection whose parts stream on no service is not watchable", () => {
  expect(work({ ...awardWinningMovies }, REACH)).toBe(false)
})

test("a service no page answers for does not make a collection watchable", () => {
  const gone: Service = { slug: "gone", held: true, free: true }
  expect(work(on(gone), REACH)).toBe(false)
})
