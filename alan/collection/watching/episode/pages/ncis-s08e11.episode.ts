import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS08e11 = {
  id: "01a1884b-ef6c-7b0e-a888-72df5001b85e",
  type: "page-type/episode",
  slug: "ncis-s08e11",
  description:
    "Gibbs and the NCIS team partner with a Coast Guard Investigative Service (CGIS) Agent to solve the murder of a Marine gunned down on a dinner boat.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-8"],
  position: 11,
  publishedAt: "2011-01-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334577",
      externalLink: "https://www.themoviedb.org/tv/4614/season/8/episode/11",
    },
  ],
  title: "Ships in the Night",
  episodeType: "standard",
  stillPath: "/oUOLzt3utFfeTqPv0Bzxrlx4TiL.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
