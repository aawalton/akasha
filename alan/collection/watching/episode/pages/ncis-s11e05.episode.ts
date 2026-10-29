import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS11e05 = {
  id: "01a1884b-ef70-7fad-9f0f-a4b0ecadbca6",
  type: "page-type/episode",
  slug: "ncis-s11e05",
  description:
    "DiNozzo returns to his Baltimore Police Department days when he sees a felony suspect from a 15-year-old case at the NCIS crime scene of a murdered Petty Officer.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-11"],
  position: 5,
  publishedAt: "2013-10-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "970551",
      externalLink: "https://www.themoviedb.org/tv/4614/season/11/episode/5",
    },
  ],
  title: "Once a Crook",
  episodeType: "standard",
  stillPath: "/uDEyHlmtGBLqoFZ8fTPtaJaNnQ5.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
