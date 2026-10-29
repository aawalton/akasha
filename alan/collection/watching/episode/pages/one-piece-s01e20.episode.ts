import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const onePieceS01e20 = {
  id: "01a18884-52e5-7602-afd3-6252d7592b07",
  type: "page-type/episode",
  slug: "one-piece-s01e20",
  description:
    "The crew meets Johnny and Yosaku, Zoro's former companions, and they set sail for the Baratie restaurant in search of a cook.",
  ownLength: 25,
  ownProgress: 25,
  partOfCollections: ["season/one-piece-season-1"],
  position: 20,
  publishedAt: "2000-04-12",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1152990",
      externalLink: "https://www.themoviedb.org/tv/37854/season/1/episode/20",
    },
  ],
  title: "Famous Cook! Sanji of the Sea Restaurant!",
  episodeType: "standard",
  stillPath: "/gUjPAnmZ2zEr2uJQaDN9Y84gqnC.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T16:35:35.779Z",
  updatedAt: "2026-10-29T16:35:35.779Z",
} as const satisfies Episode
