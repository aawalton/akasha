import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS02e02 = {
  id: "01a1884b-ef63-7052-9135-cf20e22f9b7e",
  type: "page-type/episode",
  slug: "ncis-s02e02",
  description:
    "A mummified remains of a woman are found in an abandoned compound. The team discover that the woman was missing for several months, was wearing a wedding dress when she died, and might have been a victim of a serial killer.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-2"],
  position: 2,
  publishedAt: "2004-10-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334497",
      externalLink: "https://www.themoviedb.org/tv/4614/season/2/episode/2",
    },
  ],
  title: "The Good Wives Club",
  episodeType: "standard",
  stillPath: "/sQwwwpSY1Ub8XQ5H88X6tpgQsIN.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
