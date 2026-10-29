import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theBigBangTheoryS02e01 = {
  id: "01a18856-3ffe-7d1a-9eb3-760fbbe2aa68",
  type: "page-type/episode",
  slug: "the-big-bang-theory-s02e01",
  description:
    "Penny's first date with Leonard goes awry; Penny finds Sheldon to be an unwilling confidant.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/the-big-bang-theory-season-2"],
  position: 1,
  publishedAt: "2008-09-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64651",
      externalLink: "https://www.themoviedb.org/tv/1418/season/2/episode/1",
    },
  ],
  title: "The Bad Fish Paradigm",
  episodeType: "standard",
  stillPath: "/y9cFxQyFRBOewwVvkMl6SaH2om0.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:45:16.285Z",
  updatedAt: "2026-10-29T15:45:16.285Z",
} as const satisfies Episode
