import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS06e13 = {
  id: "01a1884b-ef69-726a-bf6b-6cdf3e7b9c62",
  type: "page-type/episode",
  slug: "ncis-s06e13",
  description:
    "Secrets from Ducky's clandestine past come to the forefront after he's attacked at a crime scene.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-6"],
  position: 13,
  publishedAt: "2009-01-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334417",
      externalLink: "https://www.themoviedb.org/tv/4614/season/6/episode/13",
    },
  ],
  title: "Broken Bird",
  episodeType: "standard",
  stillPath: "/mEUQF3Rfcxac9dGanKU6PxtOFu.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
