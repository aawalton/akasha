import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const onePieceS01e11 = {
  id: "01a18884-52e4-7462-af0c-fc99481eb635",
  type: "page-type/episode",
  slug: "one-piece-s01e11",
  description:
    "After learning of Captain Kuro's evil plan, Usopp runs back to the village to warn Kaya, only to find that after all his years of lying no one believes him.",
  ownLength: 25,
  ownProgress: 25,
  partOfCollections: ["season/one-piece-season-1"],
  position: 11,
  publishedAt: "2000-01-26",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1152981",
      externalLink: "https://www.themoviedb.org/tv/37854/season/1/episode/11",
    },
  ],
  title: "Expose the Plot! Pirate Butler, Captain Kuro!",
  episodeType: "standard",
  stillPath: "/b08je5NHtJwFnU5zXAH242fEuPT.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T16:35:35.779Z",
  updatedAt: "2026-10-29T16:35:35.779Z",
} as const satisfies Episode
