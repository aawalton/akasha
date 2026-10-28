import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const steinsGateS01e23 = {
  id: "01a183d4-f6a7-7ea0-813a-7903013f216a",
  type: "page-type/episode",
  slug: "steins-gate-s01e23",
  description:
    "Tasked with preventing an impending World War III by an alternate Suzuha, Okabe finds himself playing an active part in Kurisu's death.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/steins-gate-season-1"],
  position: 23,
  publishedAt: "2011-09-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "880907",
      externalLink: "https://www.themoviedb.org/tv/42509/season/1/episode/23",
    },
  ],
  title: "Open the Steins Gate",
  episodeType: "standard",
  stillPath: "/mwwX38MhYVzPRgk8kySqdHRGNzR.jpg",
  voteAverage: 8,
  createdAt: "2026-10-28T18:45:34.502Z",
  updatedAt: "2026-10-28T18:45:34.502Z",
} as const satisfies Episode
