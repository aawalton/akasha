import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const goodWitchS07e07 = {
  id: "01a18849-352b-7285-850e-ab16011fc890",
  type: "page-type/episode",
  slug: "good-witch-s07e07",
  description:
    "As the Merriwicks delve into the images on Joy's vision board, Cassie accompanies Sam on a trip to his childhood home to care for his sister.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/good-witch-season-7"],
  position: 7,
  publishedAt: "2021-06-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2960260",
      externalLink: "https://www.themoviedb.org/tv/61864/season/7/episode/7",
    },
  ],
  title: "The Magic",
  episodeType: "standard",
  stillPath: "/wbDepBena11hs8FB2kZNErTqrnZ.jpg",
  voteAverage: 5,
  createdAt: "2026-10-29T15:31:01.543Z",
  updatedAt: "2026-10-29T15:31:01.543Z",
} as const satisfies Episode
