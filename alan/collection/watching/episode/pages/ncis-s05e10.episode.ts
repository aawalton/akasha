import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS05e10 = {
  id: "01a1884b-ef68-778e-a0d8-0102b5c4ab10",
  type: "page-type/episode",
  slug: "ncis-s05e10",
  description:
    "While trying to track down a delusional and violent Marine who thinks he's still in Iraq, the NCIS team learn that the man has been the subject of a secret experiment - and it comes with a high price to pay.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-5"],
  position: 10,
  publishedAt: "2007-11-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334461",
      externalLink: "https://www.themoviedb.org/tv/4614/season/5/episode/10",
    },
  ],
  title: "Corporal Punishment",
  episodeType: "mid-season",
  stillPath: "/urv8lLKY9ZX8nwdtWxRs20YueVx.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
