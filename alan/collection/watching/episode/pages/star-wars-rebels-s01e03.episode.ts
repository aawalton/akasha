import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS01e03 = {
  id: "01a18853-ddfc-759d-b1e6-7373df6b579d",
  type: "page-type/episode",
  slug: "star-wars-rebels-s01e03",
  description: "The rebel crew undergoes a rescue mission only to face a powerful foe.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-1"],
  position: 3,
  publishedAt: "2014-10-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1010972",
      externalLink: "https://www.themoviedb.org/tv/60554/season/1/episode/3",
    },
  ],
  title: "Rise of the Old Masters",
  episodeType: "standard",
  stillPath: "/17lyd9hbILhBGVlKbKYMJVCMm3k.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
