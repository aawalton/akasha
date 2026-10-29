import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS05e05 = {
  id: "01a18885-00fb-70db-b1e5-4828d7cbf1f7",
  type: "page-type/episode",
  slug: "studio-c-s05e05",
  description:
    "Matt gives his last words, and Hunger Games characters try to decide who Katniss should marry.",
  ownLength: 25,
  ownProgress: 25,
  partOfCollections: ["season/studio-c-season-5"],
  position: 5,
  publishedAt: "2014-11-03",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5574660",
      externalLink: "https://www.themoviedb.org/tv/68207/season/5/episode/5",
    },
  ],
  title: "Season 5 Episode 5",
  episodeType: "standard",
  stillPath: "/eZDSGZyrTMJACYCYhCJCjbGo1CJ.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
