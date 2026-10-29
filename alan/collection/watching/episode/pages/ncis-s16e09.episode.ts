import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS16e09 = {
  id: "01a1884b-ef78-779f-8a73-b55ad887d433",
  type: "page-type/episode",
  slug: "ncis-s16e09",
  description:
    "When the lead suspect of an unsolved and high-profile robbery case is released from prison, the NCIS team resumes their investigation with an undercover stakeout.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-16"],
  position: 9,
  publishedAt: "2018-12-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1617242",
      externalLink: "https://www.themoviedb.org/tv/4614/season/16/episode/9",
    },
  ],
  title: "Tailing Angie",
  episodeType: "standard",
  stillPath: "/aR0wVb6s5Umy1ivoWcimEye3fMx.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
