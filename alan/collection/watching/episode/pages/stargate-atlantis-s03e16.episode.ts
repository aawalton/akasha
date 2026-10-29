import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stargateAtlantisS03e16 = {
  id: "01a18854-82d2-72ab-879d-e6fa80f4bdc2",
  type: "page-type/episode",
  slug: "stargate-atlantis-s03e16",
  description:
    "The team discovers the last of a civilization in suspended animation, whose survival is at risk when their station is critically damaged.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/stargate-atlantis-season-3"],
  position: 16,
  publishedAt: "2007-01-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "168518",
      externalLink: "https://www.themoviedb.org/tv/2290/season/3/episode/16",
    },
  ],
  title: "The Ark",
  episodeType: "standard",
  stillPath: "/y30iAUUoUiSpxzUWLJMQ83Kc7v5.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:43:22.319Z",
  updatedAt: "2026-10-29T15:43:22.319Z",
} as const satisfies Episode
