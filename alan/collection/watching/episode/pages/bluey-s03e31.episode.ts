import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS03e31 = {
  id: "01a18843-d155-7bd0-9bc1-e66d2c93530c",
  type: "page-type/episode",
  slug: "bluey-s03e31",
  description:
    "When Mum's sister Brandy comes over for a visit, she brings the kids onesies as a present, which has an unexpected effect on Bingo!",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-3"],
  position: 31,
  publishedAt: "2022-06-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3781865",
      externalLink: "https://www.themoviedb.org/tv/82728/season/3/episode/31",
    },
  ],
  title: "Onesies",
  episodeType: "standard",
  stillPath: "/jjkrzPm1LkaUVG523cWB7e2MvpL.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
