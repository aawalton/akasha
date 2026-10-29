import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS01e12 = {
  id: "01a1884b-ef62-79df-894d-efef34e116b8",
  type: "page-type/episode",
  slug: "ncis-s01e12",
  description:
    "The NCIS team are called in when a severed leg bearing a Marine tattoo is found in a trash bin, leading them to a small town where a murder scheme is afoot.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-1"],
  position: 12,
  publishedAt: "2004-02-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334441",
      externalLink: "https://www.themoviedb.org/tv/4614/season/1/episode/12",
    },
  ],
  title: "My Other Left Foot",
  episodeType: "standard",
  stillPath: "/kLW719NfwlM8RA11X14P2bSlEBS.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
