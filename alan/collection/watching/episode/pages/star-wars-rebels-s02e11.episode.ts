import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS02e11 = {
  id: "01a18853-ddfd-779f-b321-3e919b8ab408",
  type: "page-type/episode",
  slug: "star-wars-rebels-s02e11",
  description:
    "In need of new hyperspace routes due to Imperial pressure, the rebels find a shortcut but must first gain permission to use it.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-2"],
  position: 11,
  publishedAt: "2016-01-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1161488",
      externalLink: "https://www.themoviedb.org/tv/60554/season/2/episode/11",
    },
  ],
  title: "The Protector of Concord Dawn",
  episodeType: "standard",
  stillPath: "/ql8PxEmYnYX7n7UdgrqLHXFaFk6.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
