import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const goodWitchS06e05 = {
  id: "01a18849-352a-7c01-abe5-627c4bf035fd",
  type: "page-type/episode",
  slug: "good-witch-s06e05",
  description:
    "Cassie pursues a temporary art history professorship while Sam diagnoses Adam. Abigail and Donovan realize that the missing diamond from the Middleton treasure may help break the curse.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/good-witch-season-6"],
  position: 5,
  publishedAt: "2020-05-31",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2234090",
      externalLink: "https://www.themoviedb.org/tv/61864/season/6/episode/5",
    },
  ],
  title: "The Mandala",
  episodeType: "standard",
  stillPath: "/Aw7M0SZ32Yl7AGKiLjW3mirx94D.jpg",
  voteAverage: 5,
  createdAt: "2026-10-29T15:31:01.543Z",
  updatedAt: "2026-10-29T15:31:01.543Z",
} as const satisfies Episode
