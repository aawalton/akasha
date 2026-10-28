import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const freeS02e01 = {
  id: "01a183d7-ce6b-7a60-9a09-1306f6fb07c0",
  type: "page-type/episode",
  slug: "free-s02e01",
  description:
    "Haruka and his friends have grown after last summer’s tournament. Amidst the hustle and bustle of training for their individual events, their daily lives continue as usual. However, a new season now approaches!",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/free-season-2"],
  position: 1,
  publishedAt: "2014-07-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1511141",
      externalLink: "https://www.themoviedb.org/tv/61456/season/2/episode/1",
    },
  ],
  title: "Stormy Dash-Dive!",
  episodeType: "standard",
  stillPath: "/t17Yw1WSVCTwBcxxTPXcqoiDk3w.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-28T18:48:40.810Z",
  updatedAt: "2026-10-28T18:48:40.810Z",
} as const satisfies Episode
