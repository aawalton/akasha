import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const onePieceS01e23 = {
  id: "01a18884-52e5-7d99-bc90-d3085b916fd8",
  type: "page-type/episode",
  slug: "one-piece-s01e23",
  description:
    "It is revealed that Chef Zeff was a great pirate known as Red Leg Zeff. Gin explains the catastrophe the fleet met in Grand Line when they encountered Hawk-Eyes Mihawk, and Krieg attempts to take control of the Baratie.",
  ownLength: 25,
  ownProgress: 25,
  partOfCollections: ["season/one-piece-season-1"],
  position: 23,
  publishedAt: "2000-05-03",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1152993",
      externalLink: "https://www.themoviedb.org/tv/37854/season/1/episode/23",
    },
  ],
  title: "Protect Baratie! The Great Pirate, Red Foot Zeff!",
  episodeType: "standard",
  stillPath: "/x3CIxzC7szHLmwg6EV8CHzwszuv.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T16:35:35.779Z",
  updatedAt: "2026-10-29T16:35:35.779Z",
} as const satisfies Episode
