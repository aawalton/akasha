import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gravityFallsS01e13 = {
  id: "01a18849-545e-73b3-9b08-874de30eb6f6",
  type: "page-type/episode",
  slug: "gravity-falls-s01e13",
  description:
    "Stan leaves Mabel in charge of the Mystery Shack while he is gone and the power goes to her head.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/gravity-falls-season-1"],
  position: 13,
  publishedAt: "2013-02-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "871293",
      externalLink: "https://www.themoviedb.org/tv/40075/season/1/episode/13",
    },
  ],
  title: "Boss Mabel",
  episodeType: "standard",
  stillPath: "/qPJgTETJIM2gGjQBdwH6i4Zccnq.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:31:09.532Z",
  updatedAt: "2026-10-29T15:31:09.532Z",
} as const satisfies Episode
