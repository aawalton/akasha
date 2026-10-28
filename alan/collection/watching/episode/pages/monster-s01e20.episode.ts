import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const monsterS01e20 = {
  id: "01a183d8-0266-74ac-a963-bd3003c02edf",
  type: "page-type/episode",
  slug: "monster-s01e20",
  description:
    "Tenma and Dieter hitch a ride with an elderly couple on the way to Freiham. Tenma wonders if the couple plan to turn him in.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/monster-season-1"],
  position: 20,
  publishedAt: "2004-08-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "749534",
      externalLink: "https://www.themoviedb.org/tv/30981/season/1/episode/20",
    },
  ],
  title: "Journey to Freiham",
  episodeType: "standard",
  stillPath: "/hnIFlLzJbk3F2Fl3P9jDyk9LXtY.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-28T18:48:54.116Z",
  updatedAt: "2026-10-28T18:48:54.116Z",
} as const satisfies Episode
