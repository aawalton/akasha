import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gintamaS01e04 = {
  id: "01a183d6-325f-77be-9807-696248596d9d",
  type: "page-type/episode",
  slug: "gintama-s01e04",
  description:
    "Gintoki and Shinpachi meet an amanto alien girl who's been chased after by gangster.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/gintama-season-1"],
  position: 4,
  publishedAt: "2006-04-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "940278",
      externalLink: "https://www.themoviedb.org/tv/57041/season/1/episode/4",
    },
  ],
  title: "Watch Out! Weekly Shonen JUMP Sometimes Comes Out on Saturdays!",
  episodeType: "standard",
  stillPath: "/gOqkarhmFfHA2hBXJU59Slcc9HE.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-28T18:46:55.326Z",
  updatedAt: "2026-10-28T18:46:55.326Z",
} as const satisfies Episode
