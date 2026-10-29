import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS01e22 = {
  id: "01a18855-67e5-713d-925c-979c7b205519",
  type: "page-type/episode",
  slug: "steven-universe-s01e22",
  description:
    "Steven needs a musical partner for an upcoming show, so he uses a time travel device to recruit himself as the perfect bandmate.",
  ownLength: 12,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-1"],
  position: 22,
  publishedAt: "2014-09-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1005395",
      externalLink: "https://www.themoviedb.org/tv/61175/season/1/episode/22",
    },
  ],
  title: "Steven and the Stevens",
  episodeType: "standard",
  stillPath: "/itVOlh9HnJf5uZBhnJjYUItLpKH.jpg",
  voteAverage: 6.2,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
