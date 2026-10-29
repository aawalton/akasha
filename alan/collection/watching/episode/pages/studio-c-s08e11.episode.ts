import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS08e11 = {
  id: "01a18885-00fe-76f1-80a5-b8aa8ac1b5c7",
  type: "page-type/episode",
  slug: "studio-c-s08e11",
  description:
    "Snape and Voldemort discuss how they met on YouTube, and Matt finds a match for a Puritan roommate.",
  ownLength: 24,
  ownProgress: 24,
  partOfCollections: ["season/studio-c-season-8"],
  position: 11,
  publishedAt: "2018-03-12",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1432189",
      externalLink: "https://www.themoviedb.org/tv/68207/season/8/episode/11",
    },
  ],
  title: "Season 8 Episode 11",
  episodeType: "standard",
  stillPath: "/a1rqNXSb736WeHpzmTQgYkjiCbZ.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
