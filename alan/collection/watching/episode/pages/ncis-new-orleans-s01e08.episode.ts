import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisNewOrleansS01e08 = {
  id: "01a1884b-3015-780e-bf6c-cb9c735771e2",
  type: "page-type/episode",
  slug: "ncis-new-orleans-s01e08",
  description:
    "A Petty Officer is discovered dead in a Mardi Gras float storage facility with an engagement ring. Things take a mysterious turn after the team are unable to find his supposed girlfriend.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-new-orleans-season-1"],
  position: 8,
  publishedAt: "2014-11-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1014428",
      externalLink: "https://www.themoviedb.org/tv/61387/season/1/episode/8",
    },
  ],
  title: "Love Hurts",
  episodeType: "standard",
  stillPath: "/nT0SIyfdbAED2Yhs4YMivmdYMJ2.jpg",
  voteAverage: 6.3,
  createdAt: "2026-10-29T15:33:11.316Z",
  updatedAt: "2026-10-29T15:33:11.316Z",
} as const satisfies Episode
