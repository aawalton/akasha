import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS05e03 = {
  id: "01a18885-00fb-7319-b3c1-2ac1ea22a05a",
  type: "page-type/episode",
  slug: "studio-c-s05e03",
  description: "The Smiths fight back against their conniving brother.",
  ownLength: 25,
  ownProgress: 25,
  partOfCollections: ["season/studio-c-season-5"],
  position: 3,
  publishedAt: "2014-10-20",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5574642",
      externalLink: "https://www.themoviedb.org/tv/68207/season/5/episode/3",
    },
  ],
  title: "Season 5 Episode 3",
  episodeType: "standard",
  stillPath: "/yai2bpWdjCzOTfkaWmNepJP1ddx.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
