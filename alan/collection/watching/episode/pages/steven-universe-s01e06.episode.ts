import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS01e06 = {
  id: "01a18855-67e4-7327-879b-ba889a5ef5a7",
  type: "page-type/episode",
  slug: "steven-universe-s01e06",
  description:
    "Steven tries to master his shapeshifting abilities from Amethyst, but turns his fingers into cats, making it harder to do things.",
  ownLength: 12,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-1"],
  position: 6,
  publishedAt: "2013-11-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1003599",
      externalLink: "https://www.themoviedb.org/tv/61175/season/1/episode/6",
    },
  ],
  title: "Cat Fingers",
  episodeType: "standard",
  stillPath: "/bER1TaLwSNGXrVTLr6YynqtWHO6.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
