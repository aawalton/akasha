import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsTheCloneWarsS07e03 = {
  id: "01a18854-50ae-7a50-87e4-fd3d8fe25d80",
  type: "page-type/episode",
  slug: "star-wars-the-clone-wars-s07e03",
  description: "After their escape, Anakin Skywalker and the clones defend a local village.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-the-clone-wars-season-7"],
  position: 3,
  publishedAt: "2020-03-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2170500",
      externalLink: "https://www.themoviedb.org/tv/4194/season/7/episode/3",
    },
  ],
  title: "On the Wings of Keeradaks",
  episodeType: "standard",
  stillPath: "/okdbrRgw7g910qjXcqn6hfJlAcU.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:43:09.479Z",
  updatedAt: "2026-10-29T15:43:09.479Z",
} as const satisfies Episode
