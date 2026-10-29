import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMentalistS03e03 = {
  id: "01a18880-75e7-7d6f-9c47-abab711506c4",
  type: "page-type/episode",
  slug: "the-mentalist-s03e03",
  description:
    "When Patrick Jane faces off once again with cult leader Bret Stiles, Stiles offers Jane information regarding Red John and the missing Kristina Frye.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/the-mentalist-season-3"],
  position: 3,
  publishedAt: "2010-10-07",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "367740",
      externalLink: "https://www.themoviedb.org/tv/5920/season/3/episode/3",
    },
  ],
  title: "The Blood on His Hands",
  episodeType: "standard",
  stillPath: "/1PuQb0bDw86i7eYSbPf7x7m2xe5.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T16:31:22.596Z",
  updatedAt: "2026-10-29T16:31:22.596Z",
} as const satisfies Episode
