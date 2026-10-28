import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gintamaS01e12 = {
  id: "01a183d6-325f-7939-90d7-826c3ebc1c30",
  type: "page-type/episode",
  slug: "gintama-s01e12",
  description: "The kabuki district has been robbed by a mysterious thief.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/gintama-season-1"],
  position: 12,
  publishedAt: "2006-06-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "940286",
      externalLink: "https://www.themoviedb.org/tv/57041/season/1/episode/12",
    },
  ],
  title: "People Who Make Good First Impressions Usually Suck!",
  episodeType: "standard",
  stillPath: "/oaKLAjNhVIIp3nBBnVeLQV0E0L5.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-28T18:46:55.326Z",
  updatedAt: "2026-10-28T18:46:55.326Z",
} as const satisfies Episode
