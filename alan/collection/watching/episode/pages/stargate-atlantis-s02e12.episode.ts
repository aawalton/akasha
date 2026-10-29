import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stargateAtlantisS02e12 = {
  id: "01a18854-82d1-71ff-82de-9bd9d0683283",
  type: "page-type/episode",
  slug: "stargate-atlantis-s02e12",
  description:
    "Sheppard finds himself on a planet where time passes more rapidly, with no way to contact his team or return to Atlantis.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/stargate-atlantis-season-2"],
  position: 12,
  publishedAt: "2005-11-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "168488",
      externalLink: "https://www.themoviedb.org/tv/2290/season/2/episode/12",
    },
  ],
  title: "Epiphany",
  episodeType: "standard",
  stillPath: "/u0Mlk6PHCylao1Heu18zGpc6gXe.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:43:22.319Z",
  updatedAt: "2026-10-29T15:43:22.319Z",
} as const satisfies Episode
