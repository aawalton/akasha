import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const onePieceS01e22 = {
  id: "01a18884-52e5-7ccf-b0f7-70676622e431",
  type: "page-type/episode",
  slug: "one-piece-s01e22",
  description:
    "Gin returns to the Baratie with his also-starving captain, Don Krieg, to whom Sanji once more gives food, but Don Krieg betrays the cook once he regains his energy.",
  ownLength: 25,
  ownProgress: 25,
  partOfCollections: ["season/one-piece-season-1"],
  position: 22,
  publishedAt: "2000-04-26",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1152992",
      externalLink: "https://www.themoviedb.org/tv/37854/season/1/episode/22",
    },
  ],
  title: "The Strongest Pirate Fleet! Commodore Don Krieg!",
  episodeType: "standard",
  stillPath: "/ZK41o4OIPD2PYC3fjEUNQZ5d1j.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T16:35:35.779Z",
  updatedAt: "2026-10-29T16:35:35.779Z",
} as const satisfies Episode
