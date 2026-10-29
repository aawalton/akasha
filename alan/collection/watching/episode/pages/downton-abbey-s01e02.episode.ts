import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const downtonAbbeyS01e02 = {
  id: "01a18847-e984-719d-9581-8f0f09aa667b",
  type: "page-type/episode",
  slug: "downton-abbey-s01e02",
  description:
    "Matthew Crawley and his mother Isobel arrive at Downton, and have difficulty settling in. Carson is mortified when confronted by his past. Violet attempts to promote a match between Matthew and Mary. Isobel is elected to serve on the hospital board.",
  ownLength: 49,
  ownProgress: 0,
  partOfCollections: ["season/downton-abbey-season-1"],
  position: 2,
  publishedAt: "2010-10-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "779835",
      externalLink: "https://www.themoviedb.org/tv/33907/season/1/episode/2",
    },
  ],
  title: "Episode 2",
  episodeType: "standard",
  stillPath: "/abczzgIi5RdJuH03XVFHhIp2o8L.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:29:36.644Z",
  updatedAt: "2026-10-29T15:29:36.644Z",
} as const satisfies Episode
