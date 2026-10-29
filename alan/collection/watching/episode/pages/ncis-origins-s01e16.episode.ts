import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisOriginsS01e16 = {
  id: "01a1884b-5349-7809-a666-c55a5fda911d",
  type: "page-type/episode",
  slug: "ncis-origins-s01e16",
  description:
    "Vera receives an unexpected call from Bugs, who claims he's ready to answer more questions from prison after being identified as the sniper known as Sandman.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-origins-season-1"],
  position: 16,
  publishedAt: "2025-04-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "6052067",
      externalLink: "https://www.themoviedb.org/tv/243006/season/1/episode/16",
    },
  ],
  title: "Bugs",
  episodeType: "standard",
  stillPath: "/1J8AEidI0fmdORuiCSwGy0f8oub.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:33:20.328Z",
  updatedAt: "2026-10-29T15:33:20.328Z",
} as const satisfies Episode
