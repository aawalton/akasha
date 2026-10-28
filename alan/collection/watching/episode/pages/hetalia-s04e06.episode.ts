import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const hetaliaS04e06 = {
  id: "01a183d7-7ce5-7284-9e81-c294d271fea8",
  type: "page-type/episode",
  slug: "hetalia-s04e06",
  description:
    "In which Chibi Romano is a cute tsundere who really does care for Spain (even though he has an odd way of showing it).",
  ownLength: 5,
  ownProgress: 0,
  partOfCollections: ["season/hetalia-season-4"],
  position: 6,
  publishedAt: "2013-03-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1826970",
      externalLink: "https://www.themoviedb.org/tv/35138/season/4/episode/6",
    },
  ],
  title: "Romano's Diary",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-28T18:48:19.934Z",
  updatedAt: "2026-10-28T18:48:19.934Z",
} as const satisfies Episode
