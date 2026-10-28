import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const narutoS01e48 = {
  id: "01a183d1-bb4d-7fe8-90e8-42ef47691e42",
  type: "page-type/episode",
  slug: "naruto-s01e48",
  description:
    "The second-to-last match finally arrives!  Rock Lee must face down the mysterious and dangerous Gaara, a ninja who is said to have never been truly injured in a fight before.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/naruto-season-1"],
  position: 48,
  publishedAt: "2003-09-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1145531",
      externalLink: "https://www.themoviedb.org/tv/46260/season/1/episode/48",
    },
  ],
  title: "Gaara vs. Rock Lee: The Power of Youth Explodes!",
  episodeType: "standard",
  stillPath: "/by1hzL5jaQ5AgdP2pxYuPnLbKLo.jpg",
  voteAverage: 8.9,
  createdAt: "2026-10-28T18:42:02.697Z",
  updatedAt: "2026-10-28T18:42:02.697Z",
} as const satisfies Episode
