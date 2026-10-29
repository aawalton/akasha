import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS09e02 = {
  id: "01a1884b-ef6d-7c52-b066-71067befd101",
  type: "page-type/episode",
  slug: "ncis-s09e02",
  description:
    "The NCIS team uncovers a startling surprise after a young Marine shows up to his homecoming party with a fatal stab wound.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-9"],
  position: 2,
  publishedAt: "2011-09-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334591",
      externalLink: "https://www.themoviedb.org/tv/4614/season/9/episode/2",
    },
  ],
  title: "Restless",
  episodeType: "standard",
  stillPath: "/kMOx0bkmNdD7kJVkF9d8rByqzcd.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
