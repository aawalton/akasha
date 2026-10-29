import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const peacemakerS01e01 = {
  id: "01a18851-1214-76e0-9550-d348d6f2c55d",
  type: "page-type/episode",
  slug: "peacemaker-s01e01",
  description:
    "After making a miraculous recovery, Peacemaker returns home–only to discover that his freedom comes at a price.",
  ownLength: 47,
  ownProgress: 0,
  partOfCollections: ["season/peacemaker-season-1"],
  position: 1,
  publishedAt: "2022-01-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2438301",
      externalLink: "https://www.themoviedb.org/tv/110492/season/1/episode/1",
    },
  ],
  title: "A Whole New Whirled",
  episodeType: "standard",
  stillPath: "/538eLa2f3FoSwNNzHpHi0J1ZXl6.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:39:36.852Z",
  updatedAt: "2026-10-29T15:39:36.852Z",
} as const satisfies Episode
