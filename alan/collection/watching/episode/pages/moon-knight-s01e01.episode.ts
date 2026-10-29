import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const moonKnightS01e01 = {
  id: "01a1887e-d91c-7494-b516-83bd8ed37e87",
  type: "page-type/episode",
  slug: "moon-knight-s01e01",
  description:
    "Steven Grant, a mild-mannered man who works a mundane job, begins to suspect that his life may not be his own when an alter living inside him begins to emerge.",
  ownLength: 48,
  ownProgress: 48,
  partOfCollections: ["season/moon-knight-miniseries"],
  position: 1,
  publishedAt: "2022-03-30",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2239811",
      externalLink: "https://www.themoviedb.org/tv/92749/season/1/episode/1",
    },
  ],
  title: "The Goldfish Problem",
  episodeType: "standard",
  stillPath: "/h88DZpKIDo66Tvt556HCvq2BdR0.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T16:29:36.924Z",
  updatedAt: "2026-10-29T16:29:36.924Z",
} as const satisfies Episode
