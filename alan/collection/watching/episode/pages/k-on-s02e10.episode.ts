import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const kOnS02e10 = {
  id: "01a183da-447a-7e1f-904d-af247b035a51",
  type: "page-type/episode",
  slug: "k-on-s02e10",
  description: "Yui finds herself playing guitar for a band called Death Devil.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/k-on-season-2"],
  position: 10,
  publishedAt: "2010-06-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "879109",
      externalLink: "https://www.themoviedb.org/tv/42253/season/2/episode/10",
    },
  ],
  title: "Teacher!",
  episodeType: "standard",
  stillPath: "/dDl0USilDNNJfWb7gBPRQreAkOB.jpg",
  voteAverage: 8.8,
  createdAt: "2026-10-28T18:51:22.104Z",
  updatedAt: "2026-10-28T18:51:22.104Z",
} as const satisfies Episode
