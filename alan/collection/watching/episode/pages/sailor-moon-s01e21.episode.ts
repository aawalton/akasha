import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const sailorMoonS01e21 = {
  id: "01a183d8-4890-7989-8e2a-c69827a12b2f",
  type: "page-type/episode",
  slug: "sailor-moon-s01e21",
  description:
    "Nephrite uses his most powerful Youma to target an animator working for the new Sailor V movie.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/sailor-moon-season-1"],
  position: 21,
  publishedAt: "1992-08-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "992317",
      externalLink: "https://www.themoviedb.org/tv/3570/season/1/episode/21",
    },
  ],
  title: "An Animated Mess",
  episodeType: "standard",
  stillPath: "/cozA0CBmGQPGKkAxTxck3XRRmyd.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-28T18:49:12.078Z",
  updatedAt: "2026-10-28T18:49:12.078Z",
} as const satisfies Episode
