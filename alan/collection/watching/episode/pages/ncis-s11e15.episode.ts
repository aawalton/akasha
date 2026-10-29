import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS11e15 = {
  id: "01a1884b-ef71-7834-a1da-9105b35cd8c8",
  type: "page-type/episode",
  slug: "ncis-s11e15",
  description:
    "After uncovering faulty bulletproof vests in a truck filled with stolen U.S.M.C. merchandise, the NCIS team attempts to locate both the source and any vests that had been shipped to military personnel overseas.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-11"],
  position: 15,
  publishedAt: "2014-02-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "971614",
      externalLink: "https://www.themoviedb.org/tv/4614/season/11/episode/15",
    },
  ],
  title: "Bulletproof",
  episodeType: "standard",
  stillPath: "/xZrwThDEUTVmD5eMSUWk07JiuZU.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
