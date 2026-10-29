import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gravityFallsS01e12 = {
  id: "01a18849-545e-7f86-b01c-c5ad89b7e20f",
  type: "page-type/episode",
  slug: "gravity-falls-s01e12",
  description:
    "Dipper and Mabel go trick-or-treating in the summer and encounter a candy-loving monster who threatens to devour them if they don't bring him sweet things to eat.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/gravity-falls-season-1"],
  position: 12,
  publishedAt: "2012-10-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "871292",
      externalLink: "https://www.themoviedb.org/tv/40075/season/1/episode/12",
    },
  ],
  title: "Summerween",
  episodeType: "mid-season",
  stillPath: "/cge8YOjXSrwvVZyPdHm4oVzhimV.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:31:09.532Z",
  updatedAt: "2026-10-29T15:31:09.532Z",
} as const satisfies Episode
