import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMandalorianS01e04 = {
  id: "01a18885-1cd0-7ac5-a9b2-28aa1ec0f93d",
  type: "page-type/episode",
  slug: "the-mandalorian-s01e04",
  description: "The Mandalorian teams up with an ex-soldier to protect a village from raiders.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/the-mandalorian-season-1"],
  position: 4,
  publishedAt: "2019-11-29",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1980404",
      externalLink: "https://www.themoviedb.org/tv/82856/season/1/episode/4",
    },
  ],
  title: "Chapter 4: Sanctuary",
  episodeType: "standard",
  stillPath: "/cKyE2gtQT5zIpLQHnD3mFNWrKud.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T16:36:27.471Z",
  updatedAt: "2026-10-29T16:36:27.471Z",
} as const satisfies Episode
