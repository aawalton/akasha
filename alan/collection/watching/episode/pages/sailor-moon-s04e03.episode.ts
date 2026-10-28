import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const sailorMoonS04e03 = {
  id: "01a183d8-4897-7d03-98c4-74dddde91a4f",
  type: "page-type/episode",
  slug: "sailor-moon-s04e03",
  description:
    "When Ikuko is attacked by Hawk's Eye, Sailor Moon must once again rely on the mysterious Pegasus for assistance.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/sailor-moon-season-4"],
  position: 3,
  publishedAt: "1995-03-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "992470",
      externalLink: "https://www.themoviedb.org/tv/3570/season/4/episode/3",
    },
  ],
  title: "Sweet Dreams",
  episodeType: "standard",
  stillPath: "/mIV5qIDOSFIVVEvRgaUmqDPJQFJ.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-28T18:49:12.078Z",
  updatedAt: "2026-10-28T18:49:12.078Z",
} as const satisfies Episode
