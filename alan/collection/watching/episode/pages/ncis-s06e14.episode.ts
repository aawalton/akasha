import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS06e14 = {
  id: "01a1884b-ef69-7c74-9a4e-9cb23e1b6699",
  type: "page-type/episode",
  slug: "ncis-s06e14",
  description:
    "The team discovers a link between a sergeant's murder and his possibly treasonous private life.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-6"],
  position: 14,
  publishedAt: "2009-01-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334418",
      externalLink: "https://www.themoviedb.org/tv/4614/season/6/episode/14",
    },
  ],
  title: "Love and War",
  episodeType: "standard",
  stillPath: "/nQCbv1ymNhV6ZirEboRWgWIoXm3.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
