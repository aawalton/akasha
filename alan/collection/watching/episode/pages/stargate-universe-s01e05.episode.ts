import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stargateUniverseS01e05 = {
  id: "01a18855-262f-7ae5-a4f9-abe4d1985aea",
  type: "page-type/episode",
  slug: "stargate-universe-s01e05",
  description:
    "With the ship on a collision course, the crew must decide who will stay and who will flee on the shuttle to try and find a habitable planet.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/stargate-universe-season-1"],
  position: 5,
  publishedAt: "2009-10-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "353526",
      externalLink: "https://www.themoviedb.org/tv/5148/season/1/episode/5",
    },
  ],
  title: "Light",
  episodeType: "standard",
  stillPath: "/wx2pha6WetaHzuBmFTaS0wr7dGX.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:44:04.143Z",
  updatedAt: "2026-10-29T15:44:04.143Z",
} as const satisfies Episode
