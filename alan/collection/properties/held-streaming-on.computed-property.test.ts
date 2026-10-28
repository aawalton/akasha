import { expect, test } from "bun:test"
import { work } from "akasha/alan/collection/properties/held-streaming-on.computed-property.code.ts"
import type { PartsStreamingOn } from "akasha/alan/collection/properties/parts-streaming-on.computed-property.types.ts"
import { awardWinningMovies } from "akasha/alan/collection/watching/show-collection/pages/award-winning-movies.show-collection.ts"
import { amazonPrimeVideo } from "akasha/alan/collection/watching/streaming-service/pages/amazon-prime-video.streaming-service.ts"
import { crunchyroll } from "akasha/alan/collection/watching/streaming-service/pages/crunchyroll.streaming-service.ts"
import { netflix } from "akasha/alan/collection/watching/streaming-service/pages/netflix.streaming-service.ts"
import { streamingService } from "akasha/alan/collection/watching/streaming-service/streaming-service.page-type.ts"
import type { Reach } from "akasha/page/computed-property/computed-property.page-type.ts"

const NETFLIX = `${streamingService.slug}/${netflix.slug}`

const PRIME = `${streamingService.slug}/${amazonPrimeVideo.slug}`

const CRUNCHYROLL = `${streamingService.slug}/${crunchyroll.slug}`

const HELD: ReadonlySet<string> = new Set([NETFLIX, PRIME])

const REACH: Reach = {
  target: <Held>(slug: string) => ({ held: HELD.has(slug) }) as Held,
  through: () => null,
  naming: () => [],
  file: () => null,
  folder: () => null,
}

function parts(...services: readonly string[]): PartsStreamingOn {
  return services.map((service) => ({ service }))
}

test("only the services Alan holds are kept, in address order", () => {
  const fandom = { ...awardWinningMovies, partsStreamingOn: parts(CRUNCHYROLL, NETFLIX, PRIME) }
  expect(work(fandom, REACH)).toEqual([{ service: PRIME }, { service: NETFLIX }])
})

test("a collection whose rest is on no held service states no service", () => {
  const fandom = { ...awardWinningMovies, partsStreamingOn: parts(CRUNCHYROLL) }
  expect(work(fandom, REACH)).toBeNull()
})

test("a show not completed keeps its own held services", () => {
  const show = {
    ...awardWinningMovies,
    streamingOn: [CRUNCHYROLL, NETFLIX],
    completion: "in-progress" as const,
  }
  expect(work(show, REACH)).toEqual([{ service: NETFLIX }])
})

test("a completed show's own held services are left out", () => {
  const show = { ...awardWinningMovies, streamingOn: [NETFLIX], completion: "completed" as const }
  expect(work(show, REACH)).toBeNull()
})
