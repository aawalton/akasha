import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsTheCloneWarsS07e12 = {
  id: "01a18854-50af-71b2-8d91-d84d8e6accbc",
  type: "page-type/episode",
  slug: "star-wars-the-clone-wars-s07e12",
  description: "In the wake of Order 66, Ahsoka and Rex must work together to survive.",
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-the-clone-wars-season-7"],
  position: 12,
  publishedAt: "2020-05-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2231675",
      externalLink: "https://www.themoviedb.org/tv/4194/season/7/episode/12",
    },
  ],
  title: "Victory and Death",
  episodeType: "finale",
  stillPath: "/eyyOCR9U8djJPO7Bba7ffdqt7x4.jpg",
  voteAverage: 9.5,
  createdAt: "2026-10-29T15:43:09.479Z",
  updatedAt: "2026-10-29T15:43:09.479Z",
} as const satisfies Episode
