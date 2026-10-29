import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMandalorianS01e07 = {
  id: "01a18885-1cd0-7ad8-8ed4-a9f5928828dc",
  type: "page-type/episode",
  slug: "the-mandalorian-s01e07",
  description: "An old rival extends an invitation for The Mandalorian to make peace.",
  ownLength: 42,
  ownProgress: 42,
  partOfCollections: ["season/the-mandalorian-season-1"],
  position: 7,
  publishedAt: "2019-12-18",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1987337",
      externalLink: "https://www.themoviedb.org/tv/82856/season/1/episode/7",
    },
  ],
  title: "Chapter 7: The Reckoning",
  episodeType: "standard",
  stillPath: "/m483Gihn8vAt0cW5RXe5YRtchIQ.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T16:36:27.471Z",
  updatedAt: "2026-10-29T16:36:27.471Z",
} as const satisfies Episode
