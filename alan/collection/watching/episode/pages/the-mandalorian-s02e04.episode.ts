import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMandalorianS02e04 = {
  id: "01a18857-7c28-74de-a833-f6912534337b",
  type: "page-type/episode",
  slug: "the-mandalorian-s02e04",
  description: "The Mandalorian rejoins old allies for a new mission.",
  ownLength: 41,
  ownProgress: 0,
  partOfCollections: ["season/the-mandalorian-season-2"],
  position: 4,
  publishedAt: "2020-11-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2464377",
      externalLink: "https://www.themoviedb.org/tv/82856/season/2/episode/4",
    },
  ],
  title: "Chapter 12: The Siege",
  episodeType: "standard",
  stillPath: "/j31rD97OZj5ji5HEyJXAwzE1ahP.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:46:37.224Z",
  updatedAt: "2026-10-29T15:46:37.224Z",
} as const satisfies Episode
