import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMentalistS01e12 = {
  id: "01a18880-75e5-779a-9e64-8c87b2be275f",
  type: "page-type/episode",
  slug: "the-mentalist-s01e12",
  description:
    "Patrick Jane sets a mentalist trap to find out who is responsible for the murder of a high school boy who antagonized the local self-proclaimed witch by killing her cat.",
  ownLength: 42,
  ownProgress: 42,
  partOfCollections: ["season/the-mentalist-season-1"],
  position: 12,
  publishedAt: "2009-01-13",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "367701",
      externalLink: "https://www.themoviedb.org/tv/5920/season/1/episode/12",
    },
  ],
  title: "Red Rum",
  episodeType: "standard",
  stillPath: "/hRHYTu3sbY0nIjOmZjal6a9R9er.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T16:31:22.596Z",
  updatedAt: "2026-10-29T16:31:22.596Z",
} as const satisfies Episode
