import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const narutoS01e11 = {
  id: "01a183d1-bb4b-7c4c-ad9f-1548c77722fd",
  type: "page-type/episode",
  slug: "naruto-s01e11",
  description:
    "While Naruto and Sasuke train, Sakura watches over Tazuna. During a nice dinner, Sakura notices a man's face torn from a picture. The man's name was Kaiza, and he was what the country called...a \"hero\". What happened to cause Inari so much pain?",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/naruto-season-1"],
  position: 11,
  publishedAt: "2002-12-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "908136",
      externalLink: "https://www.themoviedb.org/tv/46260/season/1/episode/11",
    },
  ],
  title: "The Land Where a Hero Once Lived",
  episodeType: "standard",
  stillPath: "/cvhg1zkpVk67Nap3L9vCmmjhWVZ.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-28T18:42:02.697Z",
  updatedAt: "2026-10-28T18:42:02.697Z",
} as const satisfies Episode
