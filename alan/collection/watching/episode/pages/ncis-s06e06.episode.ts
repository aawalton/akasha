import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS06e06 = {
  id: "01a1884b-ef68-7cc1-ab4c-d2bbec3540dd",
  type: "page-type/episode",
  slug: "ncis-s06e06",
  description:
    "Gibbs and his team are searching for a cyber serial killer who takes videos of his victims. The team quickly finds out that the videos of the dead victims are false.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-6"],
  position: 6,
  publishedAt: "2008-10-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334410",
      externalLink: "https://www.themoviedb.org/tv/4614/season/6/episode/6",
    },
  ],
  title: "Murder 2.0",
  episodeType: "standard",
  stillPath: "/rPvoT14V6JDZ4Gqv16fNpOQi4fW.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
