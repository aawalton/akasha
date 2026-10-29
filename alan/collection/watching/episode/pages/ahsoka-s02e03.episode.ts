import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ahsokaS02e03 = {
  id: "01a18843-0b80-770a-91f0-c3a584fc37a4",
  type: "page-type/episode",
  slug: "ahsoka-s02e03",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["season/ahsoka-season-2"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "7682750",
      externalLink: "https://www.themoviedb.org/tv/114461/season/2/episode/3",
    },
  ],
  title: "Episode 3",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:24:17.663Z",
  updatedAt: "2026-10-29T15:24:17.663Z",
} as const satisfies Episode
