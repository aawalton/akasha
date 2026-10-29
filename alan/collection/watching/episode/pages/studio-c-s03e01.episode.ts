import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS03e01 = {
  id: "01a18885-00f9-7d88-ae2f-892d9bfeee59",
  type: "page-type/episode",
  slug: "studio-c-s03e01",
  description:
    "Professor Wilcox teaches the subtle and sophisticated art of photo bombing, and the Shoulder Angel turns to his own shoulder angel for guidance.",
  ownLength: 25,
  ownProgress: 25,
  partOfCollections: ["season/studio-c-season-3"],
  position: 1,
  publishedAt: "2013-10-07",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5580136",
      externalLink: "https://www.themoviedb.org/tv/68207/season/3/episode/1",
    },
  ],
  title: "Season 3 Episode 1",
  episodeType: "standard",
  stillPath: "/syixLBfraviIkuS4OGOieb3RFNd.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
