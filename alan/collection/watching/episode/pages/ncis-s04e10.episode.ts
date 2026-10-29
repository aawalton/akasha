import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS04e10 = {
  id: "01a1884b-ef66-7616-91f5-f838e2653c72",
  type: "page-type/episode",
  slug: "ncis-s04e10",
  description:
    "When a burnt and mummified body of a missing and wanted person is found in a furnace on a Marine base, NCIS must work with the FBI. The burnt man turns out to be a serial killer.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-4"],
  position: 10,
  publishedAt: "2006-11-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334480",
      externalLink: "https://www.themoviedb.org/tv/4614/season/4/episode/10",
    },
  ],
  title: "Smoked",
  episodeType: "standard",
  stillPath: "/qo78hfakUG5RDeqoJ6qzSuZj0H3.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
