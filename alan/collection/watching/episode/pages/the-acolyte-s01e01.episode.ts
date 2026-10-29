import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theAcolyteS01e01 = {
  id: "01a18855-e4ab-7777-9ac9-f12883c0cdff",
  type: "page-type/episode",
  slug: "the-acolyte-s01e01",
  description: "The Jedi pursue a suspect after a shocking crime.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/the-acolyte-season-1"],
  position: 1,
  publishedAt: "2024-06-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2553141",
      externalLink: "https://www.themoviedb.org/tv/114479/season/1/episode/1",
    },
  ],
  title: "Lost / Found",
  episodeType: "standard",
  stillPath: "/9BU5OxTFSPGEUMF7qEbU0BBrgOM.jpg",
  voteAverage: 5.3,
  createdAt: "2026-10-29T15:44:52.906Z",
  updatedAt: "2026-10-29T15:44:52.906Z",
} as const satisfies Episode
