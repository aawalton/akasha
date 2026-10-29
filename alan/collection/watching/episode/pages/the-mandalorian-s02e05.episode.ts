import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMandalorianS02e05 = {
  id: "01a18857-7c29-7da6-b4e1-d21b595b984d",
  type: "page-type/episode",
  slug: "the-mandalorian-s02e05",
  description:
    "The Mandalorian journeys to a world ruled by a cruel magistrate who has made a powerful enemy.",
  ownLength: 48,
  ownProgress: 0,
  partOfCollections: ["season/the-mandalorian-season-2"],
  position: 5,
  publishedAt: "2020-11-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2464378",
      externalLink: "https://www.themoviedb.org/tv/82856/season/2/episode/5",
    },
  ],
  title: "Chapter 13: The Jedi",
  episodeType: "standard",
  stillPath: "/42QoiVzHnBKAxHT4DpYIKkRTG3N.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T15:46:37.224Z",
  updatedAt: "2026-10-29T15:46:37.224Z",
} as const satisfies Episode
