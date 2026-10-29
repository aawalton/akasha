import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS01e05 = {
  id: "01a1884b-ef62-757c-9174-5579b7b10060",
  type: "page-type/episode",
  slug: "ncis-s01e05",
  description:
    "A Navy Lieutenant who was reported missing nearly ten years ago has been found by a deer hunter. When the NCIS team arrive at the scene to investigate, they see that his remains have been mummified.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-1"],
  position: 5,
  publishedAt: "2003-10-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334434",
      externalLink: "https://www.themoviedb.org/tv/4614/season/1/episode/5",
    },
  ],
  title: "The Curse",
  episodeType: "standard",
  stillPath: "/du4R9oWAHLfQXfGFebfI2ZKUkZd.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
