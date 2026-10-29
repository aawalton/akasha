import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const severanceS01e01 = {
  id: "01a1887f-8746-7195-b966-c3a3ffa53366",
  type: "page-type/episode",
  slug: "severance-s01e01",
  description:
    "Mark is promoted to lead a team who've had their memories surgically divided between their work and personal lives.",
  ownLength: 59,
  ownProgress: 59,
  partOfCollections: ["season/severance-season-1"],
  position: 1,
  publishedAt: "2022-02-17",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1982925",
      externalLink: "https://www.themoviedb.org/tv/95396/season/1/episode/1",
    },
  ],
  title: "Good News About Hell",
  episodeType: "standard",
  stillPath: "/sP3GZe9j7BY3CAyZGFuZxxnGpN1.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T16:30:21.510Z",
  updatedAt: "2026-10-29T16:30:21.510Z",
} as const satisfies Episode
