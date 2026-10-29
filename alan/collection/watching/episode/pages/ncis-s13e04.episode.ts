import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS13e04 = {
  id: "01a1884b-ef73-751d-adb7-47406baf9a85",
  type: "page-type/episode",
  slug: "ncis-s13e04",
  description:
    "Vance partners with Gibbs and returns to field duty when a murder case is connected to a former NCIS agent he locked up for stealing evidence.",
  ownLength: 41,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-13"],
  position: 4,
  publishedAt: "2015-10-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1110131",
      externalLink: "https://www.themoviedb.org/tv/4614/season/13/episode/4",
    },
  ],
  title: "Double Trouble",
  episodeType: "standard",
  stillPath: "/8CGCdVrr0noWHMzsErgxYVcRAmv.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
