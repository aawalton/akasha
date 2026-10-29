import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ahsokaS02e01 = {
  id: "01a18843-0b80-7cac-b0fe-13917d36826a",
  type: "page-type/episode",
  slug: "ahsoka-s02e01",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["season/ahsoka-season-2"],
  position: 1,
  publishedAt: "2027-01-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "7682665",
      externalLink: "https://www.themoviedb.org/tv/114461/season/2/episode/1",
    },
  ],
  title: "Episode 1",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:24:17.663Z",
  updatedAt: "2026-10-29T15:24:17.663Z",
} as const satisfies Episode
