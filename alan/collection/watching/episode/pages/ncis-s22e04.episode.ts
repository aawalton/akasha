import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS22e04 = {
  id: "01a1884b-ef84-745a-ad12-27e419a32224",
  type: "page-type/episode",
  slug: "ncis-s22e04",
  description:
    "After receiving intelligence on deadly threats to multiple locations that could lead to a catastrophic war, NCIS is called in to try to neutralize the danger.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-22"],
  position: 4,
  publishedAt: "2024-11-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5673495",
      externalLink: "https://www.themoviedb.org/tv/4614/season/22/episode/4",
    },
  ],
  title: "Sticks & Stones",
  episodeType: "standard",
  stillPath: "/hv4R2uTLYz9sLOuuoihpKCa3bX2.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
