import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS18e05 = {
  id: "01a18855-c29f-7a96-bb35-91805ef05a76",
  type: "page-type/episode",
  slug: "studio-c-s18e05",
  description:
    'Dalton performs his version of "drivers license." A detective turns in their badge, gun, and everything else. A man an unwanted nickname. Ethics students think literally. A woman asks for job advice from a human sized hamster.',
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/studio-c-season-18"],
  position: 5,
  publishedAt: "2024-03-31",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5632585",
      externalLink: "https://www.themoviedb.org/tv/68207/season/18/episode/5",
    },
  ],
  title: "HR for Hamsters",
  episodeType: "standard",
  stillPath: "/wtXOzITxz7CID2AOv5c9MScWtNg.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T15:44:44.188Z",
  updatedAt: "2026-10-29T15:44:44.188Z",
} as const satisfies Episode
