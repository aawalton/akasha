import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const torchwoodS02e13 = {
  id: "01a18859-3c6a-7a10-8209-a83718b6aed8",
  type: "page-type/episode",
  slug: "torchwood-s02e13",
  description:
    "Captain John Hart returns to wreak havoc upon Jack's world, who ends up getting captured. It is up to the Torchwood team to rescue him and save the city.",
  ownLength: 50,
  ownProgress: 0,
  partOfCollections: ["season/torchwood-season-2"],
  position: 13,
  publishedAt: "2008-04-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "21591",
      externalLink: "https://www.themoviedb.org/tv/424/season/2/episode/13",
    },
  ],
  title: "Exit Wounds",
  episodeType: "finale",
  stillPath: "/gMeaa1GSCgOdXzXpTLdXOsHSLxc.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T15:48:31.976Z",
  updatedAt: "2026-10-29T15:48:31.976Z",
} as const satisfies Episode
