import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const myHeroAcademiaS01e12 = {
  id: "01a183d4-acc2-7c07-acbc-212ae53966c0",
  type: "page-type/episode",
  slug: "my-hero-academia-s01e12",
  description:
    "All Might has finally shown up, but will he be able to defeat Nomu and save the day?!",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/my-hero-academia-season-1"],
  position: 12,
  publishedAt: "2016-06-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1183881",
      externalLink: "https://www.themoviedb.org/tv/65930/season/1/episode/12",
    },
  ],
  title: "All Might",
  episodeType: "standard",
  stillPath: "/5nMz0H4GY8XiHVIfS8FqOxBKcsu.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-28T18:45:15.586Z",
  updatedAt: "2026-10-28T18:45:15.586Z",
} as const satisfies Episode
