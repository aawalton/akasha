import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS10e23 = {
  id: "01a1884a-e0f4-7fdd-99a0-896107e45245",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s10e23",
  description:
    'Callen and Sam travel to the USS Allegiance in the Persian Gulf to work with Navy Captain Harmon "Harm" Rabb, Jr. (David James Elliott) when the NCIS team uncovers ISIS sympathizers who are targeting military locations.',
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-10"],
  position: 23,
  publishedAt: "2019-05-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1773923",
      externalLink: "https://www.themoviedb.org/tv/17610/season/10/episode/23",
    },
  ],
  title: "The Guardian",
  episodeType: "standard",
  stillPath: "/zEXG37nLWFQIhlDJT7Gc7ND7fUV.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
