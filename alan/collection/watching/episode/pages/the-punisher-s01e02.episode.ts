import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const thePunisherS01e02 = {
  id: "01a18857-ec89-72a4-9d93-7e5a4ba54311",
  type: "page-type/episode",
  slug: "the-punisher-s01e02",
  description:
    "A mysterious phone call forces Frank's hand. Meanwhile, Madani goes digging for suspects and Curtis delivers a message.",
  ownLength: 58,
  ownProgress: 0,
  partOfCollections: ["season/marvel-s-the-punisher-season-1"],
  position: 2,
  publishedAt: "2017-11-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1209319",
      externalLink: "https://www.themoviedb.org/tv/67178/season/1/episode/2",
    },
  ],
  title: "Two Dead Men",
  episodeType: "standard",
  stillPath: "/3WqDv1WhOpvK6BuRKd7qeYQFebl.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:47:05.993Z",
  updatedAt: "2026-10-29T15:47:05.993Z",
} as const satisfies Episode
