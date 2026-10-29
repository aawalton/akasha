import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stargateAtlantisS03e10 = {
  id: "01a18854-82d2-7b05-a97e-7261727bdde5",
  type: "page-type/episode",
  slug: "stargate-atlantis-s03e10",
  description:
    "The Atlantis expedition is stunned to learn that a ship full of Ancients is returning to reclaim their lost city.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/stargate-atlantis-season-3"],
  position: 10,
  publishedAt: "2006-09-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "168508",
      externalLink: "https://www.themoviedb.org/tv/2290/season/3/episode/10",
    },
  ],
  title: "The Return (1)",
  episodeType: "standard",
  stillPath: "/ms7915GM0u19ir3MEvds7D5jljP.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:43:22.319Z",
  updatedAt: "2026-10-29T15:43:22.319Z",
} as const satisfies Episode
