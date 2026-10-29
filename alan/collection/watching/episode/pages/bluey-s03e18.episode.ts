import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS03e18 = {
  id: "01a18843-d154-7384-9b75-c2513073cacb",
  type: "page-type/episode",
  slug: "bluey-s03e18",
  description:
    "When a heavy summer rain thunders over the Heeler home, Bluey is determined to dam the water in the front yard, while Mum tries to stop her constantly tracking mud into the house.",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-3"],
  position: 18,
  publishedAt: "2021-12-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3381135",
      externalLink: "https://www.themoviedb.org/tv/82728/season/3/episode/18",
    },
  ],
  title: "Rain",
  episodeType: "standard",
  stillPath: "/hPynSYRKC4aQP1WtiNfFkYUUnWI.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
