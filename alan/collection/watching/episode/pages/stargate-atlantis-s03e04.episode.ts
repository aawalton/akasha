import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stargateAtlantisS03e04 = {
  id: "01a18854-82d1-7540-b10e-917224d830a8",
  type: "page-type/episode",
  slug: "stargate-atlantis-s03e04",
  description:
    "Ronon Dex is captured by the Wraith and returned to his homeworld, where he is haunted by his past as he is forced to once again become their prey.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/stargate-atlantis-season-3"],
  position: 4,
  publishedAt: "2006-08-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "168498",
      externalLink: "https://www.themoviedb.org/tv/2290/season/3/episode/4",
    },
  ],
  title: "Sateda",
  episodeType: "standard",
  stillPath: "/gDzGgBTFA3WiZjMwCqg1jevQzEw.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:43:22.319Z",
  updatedAt: "2026-10-29T15:43:22.319Z",
} as const satisfies Episode
