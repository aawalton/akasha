import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS13e24 = {
  id: "01a1884b-ef74-7308-bed8-a5e8a050ac74",
  type: "page-type/episode",
  slug: "ncis-s13e24",
  description:
    "NCIS, the FBI, and MI6 continue an international manhunt for an escaped British spy who is targeting current and former agents.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-13"],
  position: 24,
  publishedAt: "2016-05-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1192090",
      externalLink: "https://www.themoviedb.org/tv/4614/season/13/episode/24",
    },
  ],
  title: "Family First",
  episodeType: "finale",
  stillPath: "/jlmS4o9ulmmWtswQVMrZchM3xfo.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
