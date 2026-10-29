import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDeepSpaceNineS03e01 = {
  id: "01a18852-7712-7403-a7f3-2bd0106cfb4f",
  type: "page-type/episode",
  slug: "star-trek-deep-space-nine-s03e01",
  description:
    "Stardate: 48213.1. Instead of waiting for the Jem'Hadar to attack, Sisko wants to try a different approach. He wants to take a new class starship to try to find the Founders.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-deep-space-nine-season-3"],
  position: 1,
  publishedAt: "1994-09-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1005751",
      externalLink: "https://www.themoviedb.org/tv/580/season/3/episode/1",
    },
  ],
  title: "The Search (1)",
  episodeType: "standard",
  stillPath: "/1qyoJHrQ6FBrmjrUIrBQOLdXOTS.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:41:08.240Z",
  updatedAt: "2026-10-29T15:41:08.240Z",
} as const satisfies Episode
