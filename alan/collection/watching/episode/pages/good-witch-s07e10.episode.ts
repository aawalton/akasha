import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const goodWitchS07e10 = {
  id: "01a18849-352b-7b6e-9204-808061a9f845",
  type: "page-type/episode",
  slug: "good-witch-s07e10",
  description:
    "Cassie, Abigail and Joy get ready to face the mysterious force that threatens the Merriwick family legacy. Series finale.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/good-witch-season-7"],
  position: 10,
  publishedAt: "2021-07-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3062498",
      externalLink: "https://www.themoviedb.org/tv/61864/season/7/episode/10",
    },
  ],
  title: "The Wedding",
  episodeType: "finale",
  stillPath: "/c2yBZJOmJ2C348Kl4nsG2Xoweap.jpg",
  voteAverage: 5,
  createdAt: "2026-10-29T15:31:01.543Z",
  updatedAt: "2026-10-29T15:31:01.543Z",
} as const satisfies Episode
