import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS01e10 = {
  id: "01a18883-a8ae-76df-b77c-4d30a8356496",
  type: "page-type/episode",
  slug: "criminal-minds-s01e10",
  description:
    "The team investigates the death of one teen, and the disappearance of another , which may be linked to a satanic ritual.",
  ownLength: 41,
  ownProgress: 41,
  partOfCollections: ["season/criminal-minds-season-1"],
  position: 10,
  publishedAt: "2005-11-30",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "282898",
      externalLink: "https://www.themoviedb.org/tv/4057/season/1/episode/10",
    },
  ],
  title: "The Popular Kids",
  episodeType: "standard",
  stillPath: "/tuokReAxIlXke1MZIkNhqsEWFVB.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T16:34:52.205Z",
  updatedAt: "2026-10-29T16:34:52.205Z",
} as const satisfies Episode
