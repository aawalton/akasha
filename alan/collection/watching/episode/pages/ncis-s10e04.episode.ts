import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS10e04 = {
  id: "01a1884b-ef6f-7c2f-89ac-132e891409f6",
  type: "page-type/episode",
  slug: "ncis-s10e04",
  description:
    "When a helicopter crew is adrift at sea and later discovered on shore, the NCIS team must determine the cause of the crash and locate the missing pilot.",
  ownLength: 41,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-10"],
  position: 4,
  publishedAt: "2012-10-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334676",
      externalLink: "https://www.themoviedb.org/tv/4614/season/10/episode/4",
    },
  ],
  title: "Lost at Sea",
  episodeType: "standard",
  stillPath: "/e5a6cd4keKDgH4bdEWkDCaCI0Sm.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
