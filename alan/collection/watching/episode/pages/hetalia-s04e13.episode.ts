import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const hetaliaS04e13 = {
  id: "01a183d7-7ce6-78ec-92d0-29745b5b3fdd",
  type: "page-type/episode",
  slug: "hetalia-s04e13",
  description:
    "Santa's missing and Finland is in a crisis, so he pleads for the other nations to spread the holiday cheer this Christmas until Santa can be found.",
  ownLength: 5,
  ownProgress: 0,
  partOfCollections: ["season/hetalia-season-4"],
  position: 13,
  publishedAt: "2013-04-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1826977",
      externalLink: "https://www.themoviedb.org/tv/35138/season/4/episode/13",
    },
  ],
  title: "Finding Santa",
  episodeType: "mid-season",
  voteAverage: 0,
  createdAt: "2026-10-28T18:48:19.934Z",
  updatedAt: "2026-10-28T18:48:19.934Z",
} as const satisfies Episode
