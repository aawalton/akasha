import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theBigBangTheoryS02e13 = {
  id: "01a18856-3fff-793b-b48b-9f307239ea5c",
  type: "page-type/episode",
  slug: "the-big-bang-theory-s02e13",
  description: "Sheldon creates a scientific procedure for making friends.",
  ownLength: 21,
  ownProgress: 0,
  partOfCollections: ["season/the-big-bang-theory-season-2"],
  position: 13,
  publishedAt: "2009-01-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64663",
      externalLink: "https://www.themoviedb.org/tv/1418/season/2/episode/13",
    },
  ],
  title: "The Friendship Algorithm",
  episodeType: "standard",
  stillPath: "/9q49iyMGcO9EIk9vWbnBZgfGNSF.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:45:16.285Z",
  updatedAt: "2026-10-29T15:45:16.285Z",
} as const satisfies Episode
