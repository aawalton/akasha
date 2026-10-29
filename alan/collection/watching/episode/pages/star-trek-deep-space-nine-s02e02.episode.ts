import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDeepSpaceNineS02e02 = {
  id: "01a18852-7711-7130-b68e-d2fccffacfb0",
  type: "page-type/episode",
  slug: "star-trek-deep-space-nine-s02e02",
  description:
    'Stardate: Unknown. Kira spends time with Vedek Bareil on Bajor just as "The Circle" begins arming themselves from a mysterious source.',
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-deep-space-nine-season-2"],
  position: 2,
  publishedAt: "1993-10-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1005726",
      externalLink: "https://www.themoviedb.org/tv/580/season/2/episode/2",
    },
  ],
  title: "The Circle (2)",
  episodeType: "standard",
  stillPath: "/fMckJorVH5XOPCazOVVJpNASxzc.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:41:08.240Z",
  updatedAt: "2026-10-29T15:41:08.240Z",
} as const satisfies Episode
