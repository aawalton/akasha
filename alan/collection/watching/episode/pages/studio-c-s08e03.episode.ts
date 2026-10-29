import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS08e03 = {
  id: "01a18885-00fe-7aef-81e1-06dcc8e8c220",
  type: "page-type/episode",
  slug: "studio-c-s08e03",
  description:
    "Jason shows the five stages of Netflix addiction, an 80's sitcom brings back big hair, and we take a look inside the planning committee for the upcoming Star Wars movies.",
  ownLength: 23,
  ownProgress: 23,
  partOfCollections: ["season/studio-c-season-8"],
  position: 3,
  publishedAt: "2017-10-16",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1378573",
      externalLink: "https://www.themoviedb.org/tv/68207/season/8/episode/3",
    },
  ],
  title: "Season 8 Episode 3",
  episodeType: "standard",
  stillPath: "/aBGAFiksUjEaeA5zybA8kUNEurk.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
