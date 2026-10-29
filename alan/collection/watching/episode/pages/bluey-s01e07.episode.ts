import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS01e07 = {
  id: "01a18843-d14c-776d-9a3d-cdffda365912",
  type: "page-type/episode",
  slug: "bluey-s01e07",
  description:
    "It's lunchtime on Bluey's back deck! But every BBQ needs a side salad, so Bingo's relaxing sit-down will have to wait until she finds every colour of capsicum her cousins asked for!",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-1"],
  position: 7,
  publishedAt: "2018-10-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1593873",
      externalLink: "https://www.themoviedb.org/tv/82728/season/1/episode/7",
    },
  ],
  title: "BBQ",
  episodeType: "standard",
  stillPath: "/yIiT5Js01PYXIKpJv00KuMx2paG.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
