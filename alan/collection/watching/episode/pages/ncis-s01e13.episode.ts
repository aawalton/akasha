import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS01e13 = {
  id: "01a1884b-ef62-725d-abfc-d740d4507400",
  type: "page-type/episode",
  slug: "ncis-s01e13",
  description:
    "The team investigate when a Marine recruitment officer is found shot to death by a sniper with a grudge, who leaves a white feather behind.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-1"],
  position: 13,
  publishedAt: "2004-02-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334442",
      externalLink: "https://www.themoviedb.org/tv/4614/season/1/episode/13",
    },
  ],
  title: "One Shot, One Kill",
  episodeType: "standard",
  stillPath: "/4yqXFjMAO2i1zG1iIeNPETrbACI.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
