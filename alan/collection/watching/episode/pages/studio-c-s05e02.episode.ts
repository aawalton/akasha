import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS05e02 = {
  id: "01a18885-00fb-7888-a596-06e4e507778a",
  type: "page-type/episode",
  slug: "studio-c-s05e02",
  description: "Matt tries to make a simple PB and J sandwich for a friendly picnic.",
  ownLength: 25,
  ownProgress: 25,
  partOfCollections: ["season/studio-c-season-5"],
  position: 2,
  publishedAt: "2014-11-03",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5574634",
      externalLink: "https://www.themoviedb.org/tv/68207/season/5/episode/2",
    },
  ],
  title: "Season 5 Episode 2",
  episodeType: "standard",
  stillPath: "/xIx8Hev3lOdOhzYVJMUL4wBKvUj.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
