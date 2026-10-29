import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS04e14 = {
  id: "01a1884b-ef66-7b46-ab3d-73db2b027980",
  type: "page-type/episode",
  slug: "ncis-s04e14",
  description:
    "After catching an international arms dealer, the NCIS team learn that the Navy's highly classified weapons system will be sold to arms dealer La Grenouille. To stop the transaction, the team send Ducky undercover.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-4"],
  position: 14,
  publishedAt: "2007-02-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334483",
      externalLink: "https://www.themoviedb.org/tv/4614/season/4/episode/14",
    },
  ],
  title: "Blowback",
  episodeType: "standard",
  stillPath: "/nhjPuA5IkjJRONwFUbnuqaTL3q6.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
