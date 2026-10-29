import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const onePieceS01e12 = {
  id: "01a18884-52e4-7e1c-9c0b-ef2f67065de4",
  type: "page-type/episode",
  slug: "one-piece-s01e12",
  description:
    "Usopp resolves to keep his story of pirates attacking the town a lie by making sure none reach it. Luffy, Zoro, Nami, and Usopp then try to keep the Black Cat Pirates at bay.",
  ownLength: 25,
  ownProgress: 25,
  partOfCollections: ["season/one-piece-season-1"],
  position: 12,
  publishedAt: "2000-02-02",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1152982",
      externalLink: "https://www.themoviedb.org/tv/37854/season/1/episode/12",
    },
  ],
  title: "Clash with the Black Cat Pirates! The Great Battle on the Slope!",
  episodeType: "standard",
  stillPath: "/o1pUdqIr0CdNxZBg3Bn0sYqpfja.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T16:35:35.779Z",
  updatedAt: "2026-10-29T16:35:35.779Z",
} as const satisfies Episode
