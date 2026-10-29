import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS01e06 = {
  id: "01a18853-ddfc-7595-9221-01cc9e4ad91e",
  type: "page-type/episode",
  slug: "star-wars-rebels-s01e06",
  description:
    "While disrupting Empire Day festivities in order to destroy a prototype TIE fighter, the crew learns a refugee has important information and must get him off-planet before the Imperials find him.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-1"],
  position: 6,
  publishedAt: "2014-11-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1014546",
      externalLink: "https://www.themoviedb.org/tv/60554/season/1/episode/6",
    },
  ],
  title: "Empire Day",
  episodeType: "standard",
  stillPath: "/83DDEc3mo1kZGE8SdsHWuWo0iF9.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
