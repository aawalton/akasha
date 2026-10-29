import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS07e03 = {
  id: "01a1884b-ef6a-7b08-acb8-c8a4e9fb721d",
  type: "page-type/episode",
  slug: "ncis-s07e03",
  description:
    "The team must take a second look into the death of a Lieutenant after the blogger who accused them of a cover-up ends up dead.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-7"],
  position: 3,
  publishedAt: "2009-10-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334545",
      externalLink: "https://www.themoviedb.org/tv/4614/season/7/episode/3",
    },
  ],
  title: "The Inside Man",
  episodeType: "standard",
  stillPath: "/emRdBMFpbCgtFmMAGuOGt2pej0c.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
