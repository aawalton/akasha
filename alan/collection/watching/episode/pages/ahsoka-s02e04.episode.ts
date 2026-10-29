import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ahsokaS02e04 = {
  id: "01a18843-0b80-7fe4-a8bf-061405397382",
  type: "page-type/episode",
  slug: "ahsoka-s02e04",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["season/ahsoka-season-2"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "7682751",
      externalLink: "https://www.themoviedb.org/tv/114461/season/2/episode/4",
    },
  ],
  title: "Episode 4",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:24:17.663Z",
  updatedAt: "2026-10-29T15:24:17.663Z",
} as const satisfies Episode
