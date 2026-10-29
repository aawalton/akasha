import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS05e03 = {
  id: "01a18855-67eb-7dfc-aa8a-b9fd86c8f6b5",
  type: "page-type/episode",
  slug: "steven-universe-s05e03",
  description:
    'After escaping from the Diamonds, Steven and Lars encounter and befriend the "off-colors", a group of "defective" Gems who live in hiding from Gem society. Lars defends them from security robots but is critically injured in the process.',
  ownLength: 12,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-5"],
  position: 3,
  publishedAt: "2017-05-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1313216",
      externalLink: "https://www.themoviedb.org/tv/61175/season/5/episode/3",
    },
  ],
  title: "Off Colors",
  episodeType: "standard",
  stillPath: "/qClI9dtlGrZLHbJOVKMM7OJAsY3.jpg",
  voteAverage: 8.6,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
