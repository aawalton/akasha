import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS20e14 = {
  id: "01a1884b-ef82-7be8-95bf-36cdc09e56ef",
  type: "page-type/episode",
  slug: "ncis-s20e14",
  description:
    "Parker grapples with his emotions when a conman from his past turns up as a prime suspect in the murder of a Navy officer transporting millions of dollars’ worth of opioids.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-20"],
  position: 14,
  publishedAt: "2023-02-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4193499",
      externalLink: "https://www.themoviedb.org/tv/4614/season/20/episode/14",
    },
  ],
  title: "Old Wounds",
  episodeType: "standard",
  stillPath: "/rUZ0kquin0GqjzbnTHj2bQ0UCFC.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
