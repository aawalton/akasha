import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stargateAtlantisS04e01 = {
  id: "01a18854-82d2-79c8-99b8-057fcf042751",
  type: "page-type/episode",
  slug: "stargate-atlantis-s04e01",
  description:
    "Floating in deep space with the city's protective shield failing, the team must do all they can to keep Atlantis alive. A radical injury threatens Dr. Weir's life.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/stargate-atlantis-season-4"],
  position: 1,
  publishedAt: "2007-09-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "168521",
      externalLink: "https://www.themoviedb.org/tv/2290/season/4/episode/1",
    },
  ],
  title: "Adrift (2)",
  episodeType: "standard",
  stillPath: "/b4uM4AErvRTqoNLvgLTLXAUm1bo.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:43:22.319Z",
  updatedAt: "2026-10-29T15:43:22.319Z",
} as const satisfies Episode
