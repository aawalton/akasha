import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const numb3rsS04e03 = {
  id: "01a1887f-0b99-7cee-9bb2-ed667c206714",
  type: "page-type/episode",
  slug: "numb3rs-s04e03",
  description:
    "When a car crashes into a busy coffee shop, the team discovers the fatal act might not have been an accident.",
  ownLength: 41,
  ownProgress: 41,
  partOfCollections: ["season/numb3rs-season-4"],
  position: 3,
  publishedAt: "2007-10-12",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "33436",
      externalLink: "https://www.themoviedb.org/tv/578/season/4/episode/3",
    },
  ],
  title: "Velocity",
  episodeType: "standard",
  stillPath: "/mY8klpjWfbMAwxh8bTR3ocgwABt.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T16:29:49.843Z",
  updatedAt: "2026-10-29T16:29:49.843Z",
} as const satisfies Episode
