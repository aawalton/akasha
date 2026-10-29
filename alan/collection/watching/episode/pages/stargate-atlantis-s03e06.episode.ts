import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stargateAtlantisS03e06 = {
  id: "01a18854-82d1-7ba8-8781-3bb8601decfc",
  type: "page-type/episode",
  slug: "stargate-atlantis-s03e06",
  description:
    "Elizabeth Weir wakes up in a mental institution, where she is told that the expedition to Atlantis and the Stargate are figments of her imagination.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/stargate-atlantis-season-3"],
  position: 6,
  publishedAt: "2006-08-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "168501",
      externalLink: "https://www.themoviedb.org/tv/2290/season/3/episode/6",
    },
  ],
  title: "The Real World",
  episodeType: "standard",
  stillPath: "/6wKLEYQzJoY7iCAonE5kaDmXB56.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:43:22.319Z",
  updatedAt: "2026-10-29T15:43:22.319Z",
} as const satisfies Episode
