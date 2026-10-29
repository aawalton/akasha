import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS08e07 = {
  id: "01a18885-00fe-75b5-a70d-10b2533dac21",
  type: "page-type/episode",
  slug: "studio-c-s08e07",
  description:
    'Matt gets tricked by a story about sea snakes, Michelangelo gets feedback about his latest "graffiti", and things don\'t go as planned when Prince Phillip tries to kiss his true love.',
  ownLength: 24,
  ownProgress: 24,
  partOfCollections: ["season/studio-c-season-8"],
  position: 7,
  publishedAt: "2017-11-06",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1387477",
      externalLink: "https://www.themoviedb.org/tv/68207/season/8/episode/7",
    },
  ],
  title: "Season 8 Episode 7",
  episodeType: "standard",
  stillPath: "/jP2gnarv9q01pOEarZ74CWwvD8k.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
