import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS01e09 = {
  id: "01a18843-d14c-7169-836d-f227f8e63b86",
  type: "page-type/episode",
  slug: "bluey-s01e09",
  description:
    "When Bluey forgets to put her favourite toy away, cousin Socks grabs it and won't let go! The kids stage a horsey wedding to distract her, with Dad and Uncle Stripe as the horses!",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-1"],
  position: 9,
  publishedAt: "2018-10-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1593881",
      externalLink: "https://www.themoviedb.org/tv/82728/season/1/episode/9",
    },
  ],
  title: "Horsey Ride",
  episodeType: "standard",
  stillPath: "/vhFYMpKCXV1wTCfqZDEUJJHn0QJ.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
