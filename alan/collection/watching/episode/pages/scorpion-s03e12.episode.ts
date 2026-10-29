import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const scorpionS03e12 = {
  id: "01a1887f-56d6-71ad-945d-498fe98c2566",
  type: "page-type/episode",
  slug: "scorpion-s03e12",
  description:
    "When a mission in the desert results in exploding shrapnel that seriously wounds Cabe, Team Scorpion must freeze his body in order to save his life.",
  ownLength: 60,
  ownProgress: 60,
  partOfCollections: ["season/scorpion-season-3"],
  position: 12,
  publishedAt: "2017-01-02",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1250885",
      externalLink: "https://www.themoviedb.org/tv/60797/season/3/episode/12",
    },
  ],
  title: "Ice Ca-Cabes",
  episodeType: "standard",
  stillPath: "/izLTkHkhMGhHOjqLR8PUUqGs4a3.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-29T16:30:09.105Z",
  updatedAt: "2026-10-29T16:30:09.105Z",
} as const satisfies Episode
