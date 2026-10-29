import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gravityFallsS02e04 = {
  id: "01a18849-545f-7a0f-9468-a5d174a08b40",
  type: "page-type/episode",
  slug: "gravity-falls-s02e04",
  description:
    "Mabel decides to put on a sock puppet rock opera to impress a local puppeteer, but her show goes awry when Dipper's drive to uncover more of the journal's secrets leads to a supernatural disaster.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/gravity-falls-season-2"],
  position: 4,
  publishedAt: "2014-09-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1003903",
      externalLink: "https://www.themoviedb.org/tv/40075/season/2/episode/4",
    },
  ],
  title: "Sock Opera",
  episodeType: "standard",
  stillPath: "/1hXSXAVxuVXPhCxFm8pIPSSkYsd.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:31:09.532Z",
  updatedAt: "2026-10-29T15:31:09.532Z",
} as const satisfies Episode
