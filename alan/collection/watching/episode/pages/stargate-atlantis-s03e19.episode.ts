import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stargateAtlantisS03e19 = {
  id: "01a18854-82d2-76dc-b9a9-9f6088dde7ab",
  type: "page-type/episode",
  slug: "stargate-atlantis-s03e19",
  description:
    "The Atlantis team investigates the disappearance of one of their allies, only to find an old enemy engineering a race of powerful monsters.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/stargate-atlantis-season-3"],
  position: 19,
  publishedAt: "2007-01-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "168513",
      externalLink: "https://www.themoviedb.org/tv/2290/season/3/episode/19",
    },
  ],
  title: "Vengeance",
  episodeType: "standard",
  stillPath: "/q3xpASEzLDhSBDqP0SdD43uaMGw.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:43:22.319Z",
  updatedAt: "2026-10-29T15:43:22.319Z",
} as const satisfies Episode
