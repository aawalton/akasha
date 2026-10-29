import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS15e02 = {
  id: "01a1884b-ef76-7435-980c-8aebd747de9b",
  type: "page-type/episode",
  slug: "ncis-s15e02",
  description:
    "NCIS investigates when the body of a murdered Navy Lieutenant, who disappeared over a year ago, is found by a cemetery grounds crew while relocating caskets on the property.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-15"],
  position: 2,
  publishedAt: "2017-10-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1367784",
      externalLink: "https://www.themoviedb.org/tv/4614/season/15/episode/2",
    },
  ],
  title: "Twofer",
  episodeType: "standard",
  stillPath: "/oI0OZ1mCtzz94Dk70L2ffzpufZU.jpg",
  voteAverage: 8.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
