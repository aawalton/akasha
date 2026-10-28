import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const jujutsuKaisenS01e01 = {
  id: "01a183d3-5328-7717-9929-f4c9af552ae0",
  type: "page-type/episode",
  slug: "jujutsu-kaisen-s01e01",
  description:
    "After visiting his beloved grandfather in the hospital, Yuji Itadori encounters an apprentice sorcerer who demands that Yuji hand over a cursed relic.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/jujutsu-kaisen-season-1"],
  position: 1,
  publishedAt: "2020-10-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1984409",
      externalLink: "https://www.themoviedb.org/tv/95479/season/1/episode/1",
    },
  ],
  title: "Ryomen Sukuna",
  episodeType: "standard",
  stillPath: "/3wymoL9HYpllpFrcD8VCvemktGg.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-28T18:43:47.111Z",
  updatedAt: "2026-10-28T18:43:47.111Z",
} as const satisfies Episode
