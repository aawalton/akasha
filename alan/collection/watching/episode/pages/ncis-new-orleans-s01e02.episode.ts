import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisNewOrleansS01e02 = {
  id: "01a1884b-3014-789e-b5c9-aa4b15ee2619",
  type: "page-type/episode",
  slug: "ncis-new-orleans-s01e02",
  description:
    "A Navy Lieutenant on shore leave dies of the bubonic plague, sending the New Orleans team into a tailspin to locate all other sailers on liberty to control an outbreak and find the source. Special Agent Tony DiNozzo gives a helping hand.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-new-orleans-season-1"],
  position: 2,
  publishedAt: "2014-09-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1010685",
      externalLink: "https://www.themoviedb.org/tv/61387/season/1/episode/2",
    },
  ],
  title: "Carrier",
  episodeType: "standard",
  stillPath: "/3jBkKUys7UKKwxQ5eEAkT6XuhJw.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-29T15:33:11.316Z",
  updatedAt: "2026-10-29T15:33:11.316Z",
} as const satisfies Episode
