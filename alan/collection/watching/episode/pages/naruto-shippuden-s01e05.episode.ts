import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const narutoShippudenS01e05 = {
  id: "01a183d2-3bd4-74cf-9087-3c39dca3e9aa",
  type: "page-type/episode",
  slug: "naruto-shippuden-s01e05",
  description:
    "Naruto and Sakura defeat Kakashi in the survival challenge. Tsunade assigns them to a three-man squad led by Kakashi, who tells them they are now his equals.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/naruto-shippuden-season-1"],
  position: 5,
  publishedAt: "2007-03-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "761476",
      externalLink: "https://www.themoviedb.org/tv/31910/season/1/episode/5",
    },
  ],
  title: "The Kazekage Stands Tall",
  episodeType: "standard",
  stillPath: "/vxaK3b4JLtz44ApG7xp7xrCtdoS.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-28T18:42:35.603Z",
  updatedAt: "2026-10-28T18:42:35.603Z",
} as const satisfies Episode
