import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS02e06 = {
  id: "01a18885-00f9-7831-82b7-51ce349e705e",
  type: "page-type/episode",
  slug: "studio-c-s02e06",
  description:
    "Get a rare sneak peek behind the scenes of Studio C, watch as Gandalf confronts his biggest challenge yet, and see Ann go door to door renewing library cards.",
  ownLength: 24,
  ownProgress: 24,
  partOfCollections: ["season/studio-c-season-2"],
  position: 6,
  publishedAt: "2013-05-06",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1383573",
      externalLink: "https://www.themoviedb.org/tv/68207/season/2/episode/6",
    },
  ],
  title: "Season 2 Episode 6",
  episodeType: "standard",
  stillPath: "/mDfAt0wf46oePNcodtBqfX9ZjW8.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
