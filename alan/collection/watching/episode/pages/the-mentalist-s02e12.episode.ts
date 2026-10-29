import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMentalistS02e12 = {
  id: "01a18880-75e6-7a59-9a02-91340cb3fa93",
  type: "page-type/episode",
  slug: "the-mentalist-s02e12",
  description:
    "Patrick Jane and the team investigate the murder of a mayor's aide, and Rigsby and Van Pelt make a big announcement.",
  ownLength: 42,
  ownProgress: 42,
  partOfCollections: ["season/the-mentalist-season-2"],
  position: 12,
  publishedAt: "2010-01-21",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "367726",
      externalLink: "https://www.themoviedb.org/tv/5920/season/2/episode/12",
    },
  ],
  title: "Bleeding Heart",
  episodeType: "standard",
  stillPath: "/zKOqj7E47V7j8vFJEsF2Xfat1Cf.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T16:31:22.596Z",
  updatedAt: "2026-10-29T16:31:22.596Z",
} as const satisfies Episode
