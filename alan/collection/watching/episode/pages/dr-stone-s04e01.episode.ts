import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const drStoneS04e01 = {
  id: "01a183d9-8fc2-7244-b150-dcf0ae517e75",
  type: "page-type/episode",
  slug: "dr-stone-s04e01",
  description:
    "Senku and his companions finally set off for America in search of corn. However, a dispute arises between Ryusui and Senku shortly after they depart.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/dr-stone-season-4"],
  position: 1,
  publishedAt: "2025-01-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5757949",
      externalLink: "https://www.themoviedb.org/tv/86031/season/4/episode/1",
    },
  ],
  title: "RYUSUI VS. SENKU",
  episodeType: "standard",
  stillPath: "/nEe13H2dzeMLZsKgxoZWtMLsN5y.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-28T18:50:35.838Z",
  updatedAt: "2026-10-28T18:50:35.838Z",
} as const satisfies Episode
