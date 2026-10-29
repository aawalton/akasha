import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS03e03 = {
  id: "01a18853-ddfd-7d03-932e-a708ccb6f86d",
  type: "page-type/episode",
  slug: "star-wars-rebels-s03e03",
  description:
    "With the rebellion in desperate need of pilots, Sabine goes undercover as an Imperial cadet to recruit defectors -- including the confident and gifted Wedge Antilles.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-3"],
  position: 3,
  publishedAt: "2016-10-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1231820",
      externalLink: "https://www.themoviedb.org/tv/60554/season/3/episode/3",
    },
  ],
  title: "The Antilles Extraction",
  episodeType: "standard",
  stillPath: "/A4M4FY7dzBZl6nmtOk2dtQJ1lPo.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
