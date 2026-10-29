import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const showClassS01e03 = {
  id: "01a18851-e164-7b80-84fd-445e3a7e4220",
  type: "page-type/episode",
  slug: "show-class-s01e03",
  description:
    "Zig takes action to save his relationship and becomes physical with Maya, despite her protests and learns the meaning of consent.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/class-season-1"],
  position: 3,
  publishedAt: "2016-01-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1155092",
      externalLink: "https://www.themoviedb.org/tv/65152/season/1/episode/3",
    },
  ],
  title: "#YesMeansYes",
  episodeType: "standard",
  stillPath: "/pG04dppub8ZwEQC9gGwiE29axFp.jpg",
  voteAverage: 5,
  createdAt: "2026-10-29T15:40:29.924Z",
  updatedAt: "2026-10-29T15:40:29.924Z",
} as const satisfies Episode
