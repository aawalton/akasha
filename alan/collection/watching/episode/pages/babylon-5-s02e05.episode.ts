import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const babylon5S02e05 = {
  id: "01a18843-507f-7f58-9ee3-24bac3f66921",
  type: "page-type/episode",
  slug: "babylon-5-s02e05",
  description:
    "A 100-year-old space exploration ship appears near Babylon 5 with two passengers - a woman in cryogenic sleep, the corpse of her husband, and something sinister that has unfinished business with a half mad lurker.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/babylon-5-the-coming-of-shadows"],
  position: 5,
  publishedAt: "1994-11-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "235859",
      externalLink: "https://www.themoviedb.org/tv/3137/season/2/episode/5",
    },
  ],
  title: "The Long Dark",
  episodeType: "standard",
  stillPath: "/4A1LlhJQSUMF4uAX6SDwL14mkvD.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:24:35.325Z",
  updatedAt: "2026-10-29T15:24:35.325Z",
} as const satisfies Episode
