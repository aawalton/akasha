import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stargateAtlantisS03e12 = {
  id: "01a18854-82d2-7f4b-8a22-e26da3331fea",
  type: "page-type/episode",
  slug: "stargate-atlantis-s03e12",
  description:
    "The inhabitants of Atlantis begin to suffer ill effects when the planet's whale population begins migrating to the island city, bringing an unexpected harbinger of doom.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/stargate-atlantis-season-3"],
  position: 12,
  publishedAt: "2006-11-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "168510",
      externalLink: "https://www.themoviedb.org/tv/2290/season/3/episode/12",
    },
  ],
  title: "Echoes",
  episodeType: "standard",
  stillPath: "/6IuekQcCjq0xU5EgjixbYiNAPQQ.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:43:22.319Z",
  updatedAt: "2026-10-29T15:43:22.319Z",
} as const satisfies Episode
