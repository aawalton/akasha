import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMandalorianS02e06 = {
  id: "01a18857-7c29-7c2d-baa2-10e932228a4a",
  type: "page-type/episode",
  slug: "the-mandalorian-s02e06",
  description: "The Mandalorian and Child travel to an ancient site.",
  ownLength: 35,
  ownProgress: 0,
  partOfCollections: ["season/the-mandalorian-season-2"],
  position: 6,
  publishedAt: "2020-12-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2464379",
      externalLink: "https://www.themoviedb.org/tv/82856/season/2/episode/6",
    },
  ],
  title: "Chapter 14: The Tragedy",
  episodeType: "standard",
  stillPath: "/hRqJbGFdU2OpjcAGymQHN0WlMdC.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T15:46:37.224Z",
  updatedAt: "2026-10-29T15:46:37.224Z",
} as const satisfies Episode
