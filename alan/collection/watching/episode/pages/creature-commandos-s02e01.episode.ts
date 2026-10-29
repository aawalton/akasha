import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const creatureCommandosS02e01 = {
  id: "01a18844-7d9e-7f44-9c3e-83169265d4f5",
  type: "page-type/episode",
  slug: "creature-commandos-s02e01",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["season/creature-commandos-season-2"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "7235745",
      externalLink: "https://www.themoviedb.org/tv/219543/season/2/episode/1",
    },
  ],
  title: "Starry Night",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:25:52.413Z",
  updatedAt: "2026-10-29T15:25:52.413Z",
} as const satisfies Episode
