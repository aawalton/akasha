import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const bleachS01e05 = {
  id: "01a183d3-f46c-7333-b344-2c2608fef591",
  type: "page-type/episode",
  slug: "bleach-s01e05",
  description: "Rukia Kuchiki and Yasutora Sado team up to take on the Hollow Shrieker.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/bleach-season-1"],
  position: 5,
  publishedAt: "2004-11-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "750578",
      externalLink: "https://www.themoviedb.org/tv/30984/season/1/episode/5",
    },
  ],
  title: "Beat the Invisible Enemy!",
  episodeType: "standard",
  stillPath: "/wvjKubGxpHtD6xa2eO2PyVQXENg.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-28T18:44:28.395Z",
  updatedAt: "2026-10-28T18:44:28.395Z",
} as const satisfies Episode
