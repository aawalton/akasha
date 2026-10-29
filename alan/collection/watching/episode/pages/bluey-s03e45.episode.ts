import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS03e45 = {
  id: "01a18843-d156-77f1-b783-b8f33c3b84dc",
  type: "page-type/episode",
  slug: "bluey-s03e45",
  description:
    "At the chemist, Bluey, Bingo and their friends have fun playing with the CCTV screens.",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-3"],
  position: 45,
  publishedAt: "2023-05-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4215665",
      externalLink: "https://www.themoviedb.org/tv/82728/season/3/episode/45",
    },
  ],
  title: "TV Shop",
  episodeType: "standard",
  stillPath: "/h6ijppKDsWwztMPO22IcmPA1JJ8.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
