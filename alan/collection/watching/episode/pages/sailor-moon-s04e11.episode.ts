import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const sailorMoonS04e11 = {
  id: "01a183d8-4898-74be-b077-ee128f514a95",
  type: "page-type/episode",
  slug: "sailor-moon-s04e11",
  description:
    "Ami befriends Mamoru's colleague Natsumi, a widow who is trying to restore a classic car.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/sailor-moon-season-4"],
  position: 11,
  publishedAt: "1995-06-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "992478",
      externalLink: "https://www.themoviedb.org/tv/3570/season/4/episode/11",
    },
  ],
  title: "Driven Dreamer",
  episodeType: "standard",
  stillPath: "/pvZiF68JhAtBx4PvjXyjCDMWnaS.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-28T18:49:12.078Z",
  updatedAt: "2026-10-28T18:49:12.078Z",
} as const satisfies Episode
