import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS16e12 = {
  id: "01a1884b-ef78-701a-baf0-559cbc8d1709",
  type: "page-type/episode",
  slug: "ncis-s16e12",
  description:
    "An old family friend, Army Corporal John Sydney, beseeches Gibbs to join him on a road trip to search for a missing military I.D. bracelet. Also, a Navy Lieutenant in NCIS protective custody is poisoned by an infamous drug dealer.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-16"],
  position: 12,
  publishedAt: "2019-01-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1648362",
      externalLink: "https://www.themoviedb.org/tv/4614/season/16/episode/12",
    },
  ],
  title: "The Last Link",
  episodeType: "standard",
  stillPath: "/a6gj6BLyX3XFsxFWHc2ntOHmFXc.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
