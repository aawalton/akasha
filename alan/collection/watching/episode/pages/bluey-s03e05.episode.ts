import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS03e05 = {
  id: "01a18843-d153-7280-9212-e929d450907e",
  type: "page-type/episode",
  slug: "bluey-s03e05",
  description:
    "Bingo is helping Mum make an omelette for Dad's birthday breakfast, but cracking eggs is harder than it looks, and Dad is getting hungrier by the minute.",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-3"],
  position: 5,
  publishedAt: "2021-11-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3350903",
      externalLink: "https://www.themoviedb.org/tv/82728/season/3/episode/5",
    },
  ],
  title: "Omelette",
  episodeType: "standard",
  stillPath: "/hFOdB7NghGAKMcQwhwDomrlkvFC.jpg",
  voteAverage: 6,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
