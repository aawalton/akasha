import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS07e09 = {
  id: "01a1884b-ef6a-738d-8f73-5e5a1c83d5c6",
  type: "page-type/episode",
  slug: "ncis-s07e09",
  description:
    "A dead Marine's day job at a government think tank leads Gibbs and the team into the life of a 12-year-old prodigy who may be the killer's next target.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-7"],
  position: 9,
  publishedAt: "2009-11-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334551",
      externalLink: "https://www.themoviedb.org/tv/4614/season/7/episode/9",
    },
  ],
  title: "Child's Play",
  episodeType: "standard",
  stillPath: "/q3NdmtDzL0TjeXxLuwD87GdaoON.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
