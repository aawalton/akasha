import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const steinsGateS01e03 = {
  id: "01a183d4-f6a6-7f5b-a520-81646f683231",
  type: "page-type/episode",
  slug: "steins-gate-s01e03",
  description: "Okabe suspects his microwave oven is behind the recent unusual events.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/steins-gate-season-1"],
  position: 3,
  publishedAt: "2011-04-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "880887",
      externalLink: "https://www.themoviedb.org/tv/42509/season/1/episode/3",
    },
  ],
  title: "Parallel World Paranoia",
  episodeType: "standard",
  stillPath: "/p78yoSbi7wXww1rEGYGbYSUm3wl.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-28T18:45:34.502Z",
  updatedAt: "2026-10-28T18:45:34.502Z",
} as const satisfies Episode
