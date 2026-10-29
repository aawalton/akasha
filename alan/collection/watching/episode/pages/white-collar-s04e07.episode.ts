import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const whiteCollarS04e07 = {
  id: "01a18881-51a2-7b33-8d9d-89d1fbb0a662",
  type: "page-type/episode",
  slug: "white-collar-s04e07",
  description:
    "A criminal with a vendetta against Peter hires a political fixer to sabotage the trial.",
  ownLength: 44,
  ownProgress: 44,
  partOfCollections: ["season/white-collar-season-4"],
  position: 7,
  publishedAt: "2012-08-28",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "596298",
      externalLink: "https://www.themoviedb.org/tv/21510/season/4/episode/7",
    },
  ],
  title: "Compromising Positions",
  episodeType: "standard",
  stillPath: "/ax7mosEwSYvbWHkfyq2pinQQJoy.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T16:32:18.847Z",
  updatedAt: "2026-10-29T16:32:18.847Z",
} as const satisfies Episode
