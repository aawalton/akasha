import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS01e23 = {
  id: "01a18855-67e5-7f55-8783-1705fe098842",
  type: "page-type/episode",
  slug: "steven-universe-s01e23",
  description:
    "Steven attempts to tame a monster's wild form when he accidentally releases it from its gem bubble.",
  ownLength: 12,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-1"],
  position: 23,
  publishedAt: "2014-09-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1005505",
      externalLink: "https://www.themoviedb.org/tv/61175/season/1/episode/23",
    },
  ],
  title: "Monster Buddies",
  episodeType: "standard",
  stillPath: "/yGu84qa4AeyqPEmq4tw6Ofw3mW1.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
