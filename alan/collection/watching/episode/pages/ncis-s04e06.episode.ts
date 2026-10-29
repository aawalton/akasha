import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS04e06 = {
  id: "01a1884b-ef66-7981-a351-4f73d7ca58e9",
  type: "page-type/episode",
  slug: "ncis-s04e06",
  description:
    "It's Halloween and the NCIS team are busy investigating a ransom case. A Marine's daughter has been kidnapped after the Marine was attacked in his home. The investigation leads them to a fact that the couple has been separated.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-4"],
  position: 6,
  publishedAt: "2006-10-31",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334477",
      externalLink: "https://www.themoviedb.org/tv/4614/season/4/episode/6",
    },
  ],
  title: "Witch Hunt",
  episodeType: "standard",
  stillPath: "/ypLbBV0C13JBSntnvz8BlbL1frf.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
