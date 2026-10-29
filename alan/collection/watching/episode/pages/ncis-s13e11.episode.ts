import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS13e11 = {
  id: "01a1884b-ef73-7632-b008-6acbc02fbfe3",
  type: "page-type/episode",
  slug: "ncis-s13e11",
  description:
    "After Ducky is attacked by a man claiming to have information about his half-brother who died decades ago, the NCIS team searches for the perpetrator.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-13"],
  position: 11,
  publishedAt: "2015-12-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1134603",
      externalLink: "https://www.themoviedb.org/tv/4614/season/13/episode/11",
    },
  ],
  title: "Spinning Wheel",
  episodeType: "mid-season",
  stillPath: "/y6rEHwZVVum8l7G3jeKeB0UxR8n.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
