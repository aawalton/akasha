import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS01e08 = {
  id: "01a18885-00f8-7487-9fa1-8b9d82e55b62",
  type: "page-type/episode",
  slug: "studio-c-s01e08",
  description:
    "Spencer meets an old friend, Jason's shoulder devil tries his luck, and Whitney's weight is called into question.",
  ownLength: 25,
  ownProgress: 25,
  partOfCollections: ["season/studio-c-season-1"],
  position: 8,
  publishedAt: "2012-11-26",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1378623",
      externalLink: "https://www.themoviedb.org/tv/68207/season/1/episode/8",
    },
  ],
  title: "Season 1 Episode 8",
  episodeType: "standard",
  stillPath: "/mJP1nZgv1attV5MzEAOaewAyVrV.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
