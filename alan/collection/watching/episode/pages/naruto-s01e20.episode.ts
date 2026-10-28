import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const narutoS01e20 = {
  id: "01a183d1-bb4b-73f9-9178-e4ae98275698",
  type: "page-type/episode",
  slug: "naruto-s01e20",
  description:
    "Naruto and his team return to the Village Hidden in the Leaves after their battle in Land of Waves.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/naruto-season-1"],
  position: 20,
  publishedAt: "2003-02-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "908145",
      externalLink: "https://www.themoviedb.org/tv/46260/season/1/episode/20",
    },
  ],
  title: "A New Chapter Begins: The Chunin Exam!",
  episodeType: "standard",
  stillPath: "/r6DTT3moIK4CgU5OpmByLdOCU1x.jpg",
  voteAverage: 7,
  createdAt: "2026-10-28T18:42:02.697Z",
  updatedAt: "2026-10-28T18:42:02.697Z",
} as const satisfies Episode
