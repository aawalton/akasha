import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMandalorianS03e04 = {
  id: "01a18857-7c29-764b-9fad-eaa4d74d409d",
  type: "page-type/episode",
  slug: "the-mandalorian-s03e04",
  description: "Din Djarin returns to the hidden Mandalorian covert.",
  ownLength: 33,
  ownProgress: 0,
  partOfCollections: ["season/the-mandalorian-season-3"],
  position: 4,
  publishedAt: "2023-03-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4237593",
      externalLink: "https://www.themoviedb.org/tv/82856/season/3/episode/4",
    },
  ],
  title: "Chapter 20: The Foundling",
  episodeType: "standard",
  stillPath: "/b7F6DB9fm5p0ipkHYori5FCEbgu.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:46:37.224Z",
  updatedAt: "2026-10-29T15:46:37.224Z",
} as const satisfies Episode
