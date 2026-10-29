import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMandalorianS03e05 = {
  id: "01a18857-7c29-79cd-8fbe-85d6ee4b8b2e",
  type: "page-type/episode",
  slug: "the-mandalorian-s03e05",
  description: "The people of Nevarro need protection from rampant pirate attacks.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/the-mandalorian-season-3"],
  position: 5,
  publishedAt: "2023-03-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4237594",
      externalLink: "https://www.themoviedb.org/tv/82856/season/3/episode/5",
    },
  ],
  title: "Chapter 21: The Pirate",
  episodeType: "standard",
  stillPath: "/dcNK8WK5pwsUdgE4Fw2bQ6bNYlC.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:46:37.224Z",
  updatedAt: "2026-10-29T15:46:37.224Z",
} as const satisfies Episode
