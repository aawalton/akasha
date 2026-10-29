import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS02e14 = {
  id: "01a18853-ddfd-7262-86cc-319fa73a20fa",
  type: "page-type/episode",
  slug: "star-wars-rebels-s02e14",
  description:
    "The rebels contact freedom fighter Cham Syndulla, who needs help to fight off the Imperial bombing attack on his planet. While coordinating a plan to overtake and steal the carrier that houses these Imperial bombers, the rebels discover that Cham may have a plan of his own.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-2"],
  position: 14,
  publishedAt: "2016-02-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1166342",
      externalLink: "https://www.themoviedb.org/tv/60554/season/2/episode/14",
    },
  ],
  title: "Homecoming",
  episodeType: "standard",
  stillPath: "/rWyd3G6q7niDj9lUITge7JFLdKq.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
