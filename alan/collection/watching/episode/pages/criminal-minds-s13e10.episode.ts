import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS13e10 = {
  id: "01a18844-d7f7-7e83-83ae-ea6c6c277545",
  type: "page-type/episode",
  slug: "criminal-minds-s13e10",
  description:
    "When a series of backyard pool homicides are reported in California, the BAU team searches for an UnSub with a puzzling past.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-13"],
  position: 10,
  publishedAt: "2018-01-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1390861",
      externalLink: "https://www.themoviedb.org/tv/4057/season/13/episode/10",
    },
  ],
  title: "Submerged",
  episodeType: "standard",
  stillPath: "/1i1QGHtgfnxoDtbx1vmUVbekzzW.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
