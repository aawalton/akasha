import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS06e23 = {
  id: "01a1884b-ef69-7d8c-8013-383c7ed20415",
  type: "page-type/episode",
  slug: "ncis-s06e23",
  description:
    "With the appearance of Mossad agent Michael Rivkin, Tony is forced to question Ziva’s loyalty to NCIS.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-6"],
  position: 23,
  publishedAt: "2009-05-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334405",
      externalLink: "https://www.themoviedb.org/tv/4614/season/6/episode/23",
    },
  ],
  title: "Legend (2)",
  episodeType: "standard",
  stillPath: "/z2V44SQKDl26u3Op8ZYmNSnhWNE.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
