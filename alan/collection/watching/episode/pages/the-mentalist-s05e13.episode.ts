import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMentalistS05e13 = {
  id: "01a18880-75ea-7cfa-b383-02b0be1a55d8",
  type: "page-type/episode",
  slug: "the-mentalist-s05e13",
  description:
    "The team investigates a 25-year-old case that seems to involve both Red John and the Visualize group, and Lisbon contemplates her future.",
  ownLength: 42,
  ownProgress: 42,
  partOfCollections: ["season/the-mentalist-season-5"],
  position: 13,
  publishedAt: "2013-01-27",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "367799",
      externalLink: "https://www.themoviedb.org/tv/5920/season/5/episode/13",
    },
  ],
  title: "The Red Barn",
  episodeType: "standard",
  stillPath: "/rr7aNj4Z6bzHG27bj0Yds88lKUJ.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T16:31:22.596Z",
  updatedAt: "2026-10-29T16:31:22.596Z",
} as const satisfies Episode
