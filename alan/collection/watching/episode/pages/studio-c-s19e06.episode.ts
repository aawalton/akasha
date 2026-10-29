import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS19e06 = {
  id: "01a18855-c2a0-7521-8ac5-6fa0d1a6f30f",
  type: "page-type/episode",
  slug: "studio-c-s19e06",
  description:
    "A dog trainer. A competition for tires. A damsel sacrifices herself. A witch trial. A groom's test.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/studio-c-season-19"],
  position: 6,
  publishedAt: "2024-11-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5678553",
      externalLink: "https://www.themoviedb.org/tv/68207/season/19/episode/6",
    },
  ],
  title: "She's a Witch!",
  episodeType: "standard",
  stillPath: "/6KORFmBZdwzVOjjukeOgkQk2LTA.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T15:44:44.188Z",
  updatedAt: "2026-10-29T15:44:44.188Z",
} as const satisfies Episode
