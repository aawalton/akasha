import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS17e08 = {
  id: "01a1884b-ef79-7dac-b125-5434673caf92",
  type: "page-type/episode",
  slug: "ncis-s17e08",
  description:
    "The NCIS team investigates the murder of a musician in the Navy’s most elite band that performs at diplomatic events around the world.",
  ownLength: 41,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-17"],
  position: 8,
  publishedAt: "2019-11-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1977617",
      externalLink: "https://www.themoviedb.org/tv/4614/season/17/episode/8",
    },
  ],
  title: "Musical Chairs",
  episodeType: "standard",
  stillPath: "/eAXhMr6dfQziJpyde8tt5UO4jEd.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
