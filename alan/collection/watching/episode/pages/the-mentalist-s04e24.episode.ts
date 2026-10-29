import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMentalistS04e24 = {
  id: "01a18880-75ea-76a2-8904-205e48d7691e",
  type: "page-type/episode",
  slug: "the-mentalist-s04e24",
  description:
    "After another failed attempt to defeat Red John, Patrick Jane hits rock bottom, finds a lover and shoots one of his own.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/the-mentalist-season-4"],
  position: 24,
  publishedAt: "2012-05-17",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "367785",
      externalLink: "https://www.themoviedb.org/tv/5920/season/4/episode/24",
    },
  ],
  title: "The Crimson Hat",
  episodeType: "finale",
  stillPath: "/aCE1ohFGv4rpQNWk6rJrNizNkx4.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T16:31:22.596Z",
  updatedAt: "2026-10-29T16:31:22.596Z",
} as const satisfies Episode
