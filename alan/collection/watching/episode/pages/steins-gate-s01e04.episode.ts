import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const steinsGateS01e04 = {
  id: "01a183d4-f6a6-7a8d-a693-564e881a4846",
  type: "page-type/episode",
  slug: "steins-gate-s01e04",
  description: "Okabe needs to find a very old computer to hack a very new tech.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/steins-gate-season-1"],
  position: 4,
  publishedAt: "2011-04-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "880886",
      externalLink: "https://www.themoviedb.org/tv/42509/season/1/episode/4",
    },
  ],
  title: "Interpreter Rendezvous",
  episodeType: "standard",
  stillPath: "/jOvUzKQUbqdkNAtIAzQpL7GuUx.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-28T18:45:34.502Z",
  updatedAt: "2026-10-28T18:45:34.502Z",
} as const satisfies Episode
