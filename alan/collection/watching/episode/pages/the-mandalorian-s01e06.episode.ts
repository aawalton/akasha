import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMandalorianS01e06 = {
  id: "01a18885-1cd0-7672-aec0-9d3d368cffbc",
  type: "page-type/episode",
  slug: "the-mandalorian-s01e06",
  description: "The Mandalorian joins a crew of mercenaries on a dangerous mission.",
  ownLength: 45,
  ownProgress: 45,
  partOfCollections: ["season/the-mandalorian-season-1"],
  position: 6,
  publishedAt: "2019-12-13",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1987336",
      externalLink: "https://www.themoviedb.org/tv/82856/season/1/episode/6",
    },
  ],
  title: "Chapter 6: The Prisoner",
  episodeType: "standard",
  stillPath: "/w6PszuncdSiMRw7RrA7XqS8zh5Y.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T16:36:27.471Z",
  updatedAt: "2026-10-29T16:36:27.471Z",
} as const satisfies Episode
