import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMentalistS04e07 = {
  id: "01a18880-75e9-758b-849d-6dede8dfe8fa",
  type: "page-type/episode",
  slug: "the-mentalist-s04e07",
  description:
    "The search for a serial killer hits close to home for Jane when he encounters a blogger who has devoted his life to finding the killer.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/the-mentalist-season-4"],
  position: 7,
  publishedAt: "2011-11-03",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "367768",
      externalLink: "https://www.themoviedb.org/tv/5920/season/4/episode/7",
    },
  ],
  title: "Blinking Red Light",
  episodeType: "standard",
  stillPath: "/xccae4LQOpetQq53LUXNcp3FU8D.jpg",
  voteAverage: 8.7,
  createdAt: "2026-10-29T16:31:22.596Z",
  updatedAt: "2026-10-29T16:31:22.596Z",
} as const satisfies Episode
