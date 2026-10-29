import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekProdigyS01e05 = {
  id: "01a18853-1b88-7f1a-b6f0-51bc18128f91",
  type: "page-type/episode",
  slug: "star-trek-prodigy-s01e05",
  description:
    "Marooned on a deadly planet, the crew must work together with their captive Gwyn to stay alive…except the planet isn’t the only thing in pursuit.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-prodigy-season-1"],
  position: 5,
  publishedAt: "2021-11-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3340504",
      externalLink: "https://www.themoviedb.org/tv/106393/season/1/episode/5",
    },
  ],
  title: "Terror Firma",
  episodeType: "standard",
  stillPath: "/sSVuZH8DWAOAlsHQO3QnUfTDs9I.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:41:50.343Z",
  updatedAt: "2026-10-29T15:41:50.343Z",
} as const satisfies Episode
