import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMentalistS03e05 = {
  id: "01a18880-75e7-76e0-8847-bb7c731b243f",
  type: "page-type/episode",
  slug: "the-mentalist-s03e05",
  description:
    "Patrick Jane and the CBI team hit the horse track when a jockey is found murdered and suspects abound.",
  ownLength: 41,
  ownProgress: 41,
  partOfCollections: ["season/the-mentalist-season-3"],
  position: 5,
  publishedAt: "2010-10-21",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "367742",
      externalLink: "https://www.themoviedb.org/tv/5920/season/3/episode/5",
    },
  ],
  title: "The Red Ponies",
  episodeType: "standard",
  stillPath: "/7xOtZpygKF3wzDFK1VUk8AicCM3.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T16:31:22.596Z",
  updatedAt: "2026-10-29T16:31:22.596Z",
} as const satisfies Episode
