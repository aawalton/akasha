import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDiscoveryS03e09 = {
  id: "01a18852-a9f7-7b4b-a597-a5fce17b44e7",
  type: "page-type/episode",
  slug: "star-trek-discovery-s03e09",
  description:
    "The U.S.S. Discovery crew journey to a mysterious planet in hopes of finding a cure for Georgiou's deteriorating condition. Stamets and Adira make a stunning breakthrough with the newly acquired Burn data.",
  ownLength: 48,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-discovery-season-3"],
  position: 9,
  publishedAt: "2020-12-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2387216",
      externalLink: "https://www.themoviedb.org/tv/67198/season/3/episode/9",
    },
  ],
  title: "Terra Firma (1)",
  episodeType: "standard",
  stillPath: "/e4UoaZwASHoITSS667wP8nw5n1J.jpg",
  voteAverage: 5.9,
  createdAt: "2026-10-29T15:41:21.268Z",
  updatedAt: "2026-10-29T15:41:21.268Z",
} as const satisfies Episode
