import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS08e01 = {
  id: "01a1884b-ef6c-7f11-8f7a-d21ef33d7cb7",
  type: "page-type/episode",
  slug: "ncis-s08e01",
  description:
    "Gibbs must take desperate measures to protect his loved ones with Paloma Reynosa still on the loose.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-8"],
  position: 1,
  publishedAt: "2010-09-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334567",
      externalLink: "https://www.themoviedb.org/tv/4614/season/8/episode/1",
    },
  ],
  title: "Spider and the Fly",
  episodeType: "standard",
  stillPath: "/jKNVBWjs2ARN8RdrCoUdSu1YGUZ.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
