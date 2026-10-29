import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gravityFallsS01e07 = {
  id: "01a18849-545d-7b16-84c6-c8e1df7b8a6a",
  type: "page-type/episode",
  slug: "gravity-falls-s01e07",
  description:
    "Stan throws a big weekend party to promote the Mystery Shack. Dipper makes clones of himself to impress Wendy. Mabel fights for the Party Queen title in honor of her two friends.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/gravity-falls-season-1"],
  position: 7,
  publishedAt: "2012-08-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "871287",
      externalLink: "https://www.themoviedb.org/tv/40075/season/1/episode/7",
    },
  ],
  title: "Double Dipper",
  episodeType: "standard",
  stillPath: "/lFnNm44mlhShh7c07Gzk7j8Si9l.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:31:09.532Z",
  updatedAt: "2026-10-29T15:31:09.532Z",
} as const satisfies Episode
