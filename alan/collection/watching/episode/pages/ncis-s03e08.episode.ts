import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS03e08 = {
  id: "01a1884b-ef65-7f09-a2ef-286aab9ab02b",
  type: "page-type/episode",
  slug: "ncis-s03e08",
  description:
    "When bodies of two hired assassins are delivered to the NCIS team, Ziva and Tony go undercover assuming the victim's identities in order to find the person who hired the assassins for their mission. Gibbs discovers that his team are not the only ones working on the case.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-3"],
  position: 8,
  publishedAt: "2005-11-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334524",
      externalLink: "https://www.themoviedb.org/tv/4614/season/3/episode/8",
    },
  ],
  title: "Under Covers",
  episodeType: "standard",
  stillPath: "/vjhTLx9wreWUiSRgujMJFgCEg6M.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
