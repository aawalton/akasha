import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const youngSheldonS04e01 = {
  id: "01a1885a-252d-7d09-901e-22f0111f5bdb",
  type: "page-type/episode",
  slug: "young-sheldon-s04e01",
  description:
    "After graduating high school, Sheldon has a breakdown when he realizes he may not be ready for college. Dale tries to make amends with Connie.",
  ownLength: 19,
  ownProgress: 0,
  partOfCollections: ["season/young-sheldon-season-4"],
  position: 1,
  publishedAt: "2020-11-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2463316",
      externalLink: "https://www.themoviedb.org/tv/71728/season/4/episode/1",
    },
  ],
  title: "Graduation",
  episodeType: "standard",
  stillPath: "/nOEJ4hxRN0yPwSOHawxzkRIVTQn.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:49:31.561Z",
  updatedAt: "2026-10-29T15:49:31.561Z",
} as const satisfies Episode
