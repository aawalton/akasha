import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS14e02 = {
  id: "01a1884b-ef74-7982-8a43-9600711cf1c4",
  type: "page-type/episode",
  slug: "ncis-s14e02",
  description:
    "NCIS uncovers a bomb plot and a long-running theft ring while investigating a death at a Quantico reunion.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-14"],
  position: 2,
  publishedAt: "2016-09-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1224099",
      externalLink: "https://www.themoviedb.org/tv/4614/season/14/episode/2",
    },
  ],
  title: "Being Bad",
  episodeType: "standard",
  stillPath: "/6gsssI6cxfbLxCIUKUtBSqSUrlW.jpg",
  voteAverage: 6.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
