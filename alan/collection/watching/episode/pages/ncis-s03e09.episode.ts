import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS03e09 = {
  id: "01a1884b-ef65-7e75-845e-cb765a1b5a42",
  type: "page-type/episode",
  slug: "ncis-s03e09",
  description:
    "Tony is accused of murdering a woman whose body was found at Quantico and the team must prove his innocence.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-3"],
  position: 9,
  publishedAt: "2005-11-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334542",
      externalLink: "https://www.themoviedb.org/tv/4614/season/3/episode/9",
    },
  ],
  title: "Frame-Up",
  episodeType: "standard",
  stillPath: "/eMaUBZBeaheJJZfy1XB65VAYtad.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
