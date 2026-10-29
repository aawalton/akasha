import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ahsokaS02e02 = {
  id: "01a18843-0b80-7a89-a677-58c6dd152c90",
  type: "page-type/episode",
  slug: "ahsoka-s02e02",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["season/ahsoka-season-2"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "7682749",
      externalLink: "https://www.themoviedb.org/tv/114461/season/2/episode/2",
    },
  ],
  title: "Episode 2",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:24:17.663Z",
  updatedAt: "2026-10-29T15:24:17.663Z",
} as const satisfies Episode
