import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const monsterS01e01 = {
  id: "01a183d8-0264-743e-97e2-0636ca584a21",
  type: "page-type/episode",
  slug: "monster-s01e01",
  description:
    "Dr. Kenzo Tenma, a leading neurosurgeon at the Dusseldorf Hospital has received massive acclaim for his successful surgery on a famous opera singer. However, he is burdened by guilt. Due to pressure from the director, he had operated on the opera singer on the night that he was supposed to operate on another man. As a result, when the director’s orders him to operate on the mayor, he decides to ignore the order and instead works on saving the life of a young boy, brought to the hospital from the scene of a serial homicide. However, the boy's twin sister, who was brought in with the boy, and who still suffers from shock, keeps repeating the words 'kill him'.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/monster-season-1"],
  position: 1,
  publishedAt: "2004-04-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "749515",
      externalLink: "https://www.themoviedb.org/tv/30981/season/1/episode/1",
    },
  ],
  title: "Herr Dr. Tenma",
  episodeType: "standard",
  stillPath: "/gRrJaEe5oj8gsy54buNLkW8FHAZ.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-28T18:48:54.116Z",
  updatedAt: "2026-10-28T18:48:54.116Z",
} as const satisfies Episode
