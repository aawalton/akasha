import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS22e07 = {
  id: "01a1884b-ef84-7dd3-b153-778457ed371f",
  type: "page-type/episode",
  slug: "ncis-s22e07",
  description:
    "Torres receives intel from a confidential informant regarding top secret Naval information that's at risk of being sold.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-22"],
  position: 7,
  publishedAt: "2024-12-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5742347",
      externalLink: "https://www.themoviedb.org/tv/4614/season/22/episode/7",
    },
  ],
  title: "Hardboiled",
  episodeType: "standard",
  stillPath: "/rPZ9wOJDyIS5XiQqs8yKV2OXlK9.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
