import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS01e23 = {
  id: "01a1884a-e0e9-7ed2-a11c-7ae73df1eb0e",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s01e23",
  description:
    "After Callen's cover is blown and compromises the unit, the NCIS team races to find out who is behind the security breach.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-1"],
  position: 23,
  publishedAt: "2010-05-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "557297",
      externalLink: "https://www.themoviedb.org/tv/17610/season/1/episode/23",
    },
  ],
  title: "Burned",
  episodeType: "standard",
  stillPath: "/tocput3mdOsHgd60T0FwMdLuBMx.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
