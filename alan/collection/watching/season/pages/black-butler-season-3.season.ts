import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const blackButlerSeason3 = {
  id: "01a183d8-99a9-7033-8985-10495d36dcd6",
  type: "page-type/season",
  slug: "black-butler-season-3",
  description:
    "Ciel and the demon butler Sebastian are summoned by the Queen to investigate multiple reports of missing children. When their underworld contacts reveal the disappearances increase when the mysterious Noah’s Ark Circus comes to town the demonic duo must impress an enigmatic ringmaster in order to go undercover as performers-to Sebastian’s delight and Ciel’s disgust.",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/black-butler"],
  position: 3,
  publishedAt: "2014-07-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "61906",
      externalLink: "https://www.themoviedb.org/tv/50712/season/3",
    },
  ],
  title: "Book of Circus",
  posterPath: "/tGkEocRUlfaXAxqr32pN96lZtvZ.jpg",
  voteAverage: 6.2,
  createdAt: "2026-10-28T18:49:32.837Z",
  updatedAt: "2026-10-28T18:49:32.837Z",
} as const satisfies Season
