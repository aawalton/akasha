import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS06e11 = {
  id: "01a18885-00fc-7789-8059-b02f5abd1335",
  type: "page-type/episode",
  slug: "studio-c-s06e11",
  description:
    "It's a Very Merry Studio C Christmas Special. A department store decorates for Christmas a bit early, a brother and sister see the power of the Elf on the Shelf, and Mr. Ecklestone's student drivers take him on a snowy ride.",
  ownLength: 26,
  ownProgress: 26,
  partOfCollections: ["season/studio-c-season-6"],
  position: 11,
  publishedAt: "2015-12-07",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2855497",
      externalLink: "https://www.themoviedb.org/tv/68207/season/6/episode/11",
    },
  ],
  title: "Season 6 Christmas Special",
  episodeType: "standard",
  stillPath: "/iJyuhnAtYk5WB4nepvOVLwWkm7s.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
