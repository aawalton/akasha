import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMandalorianS03e06 = {
  id: "01a18857-7c29-7628-84d9-cabe920609c0",
  type: "page-type/episode",
  slug: "the-mandalorian-s03e06",
  description: "The Mandalorian visits an opulent world.",
  ownLength: 47,
  ownProgress: 0,
  partOfCollections: ["season/the-mandalorian-season-3"],
  position: 6,
  publishedAt: "2023-04-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4237596",
      externalLink: "https://www.themoviedb.org/tv/82856/season/3/episode/6",
    },
  ],
  title: "Chapter 22: Guns for Hire",
  episodeType: "standard",
  stillPath: "/tIbTlMWkVBFUeUT76FXWb6jzteW.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-29T15:46:37.224Z",
  updatedAt: "2026-10-29T15:46:37.224Z",
} as const satisfies Episode
