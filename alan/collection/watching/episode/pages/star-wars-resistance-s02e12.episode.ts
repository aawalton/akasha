import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsResistanceS02e12 = {
  id: "01a18853-f9b0-7e8d-9e61-d36f5af95abf",
  type: "page-type/episode",
  slug: "star-wars-resistance-s02e12",
  description:
    "Kaz, Yeager and Synara trace a distress call to a planet where a Resistance agent has gone missing. Things only get worse as a mysterious bounty hunter starts hunting them.",
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-resistance-season-2"],
  position: 12,
  publishedAt: "2019-12-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1992476",
      externalLink: "https://www.themoviedb.org/tv/79093/season/2/episode/12",
    },
  ],
  title: "The Missing Agent",
  episodeType: "standard",
  stillPath: "/sduk72QTsu1rRGPAfSU7TTRRrXI.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:42:47.214Z",
  updatedAt: "2026-10-29T15:42:47.214Z",
} as const satisfies Episode
