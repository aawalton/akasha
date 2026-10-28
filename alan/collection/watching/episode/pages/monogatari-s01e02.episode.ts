import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const monogatariS01e02 = {
  id: "01a183db-7938-7ad7-a949-a7dd301edde2",
  type: "page-type/episode",
  slug: "monogatari-s01e02",
  description:
    "Koyomi takes Hitagi to consult Meme Oshino, the wandering expert on supernatural oddities. Meme provides advice to them on exorcising apparitions.",
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/monogatari-season-1"],
  position: 2,
  publishedAt: "2009-07-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "907791",
      externalLink: "https://www.themoviedb.org/tv/46195/season/1/episode/2",
    },
  ],
  title: "Hitagi Crab (2)",
  episodeType: "standard",
  stillPath: "/doaYFDNGcuyfyHg7RWpbRw8mbF2.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-28T18:52:41.143Z",
  updatedAt: "2026-10-28T18:52:41.143Z",
} as const satisfies Episode
