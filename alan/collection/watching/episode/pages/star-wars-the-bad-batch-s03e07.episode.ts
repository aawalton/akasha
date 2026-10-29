import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsTheBadBatchS03e07 = {
  id: "01a18854-2007-718a-97aa-b790e296437d",
  type: "page-type/episode",
  slug: "star-wars-the-bad-batch-s03e07",
  description: "As enemies close in, the Batch must evacuate a stronghold.",
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-the-bad-batch-season-3"],
  position: 7,
  publishedAt: "2024-03-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5093236",
      externalLink: "https://www.themoviedb.org/tv/105971/season/3/episode/7",
    },
  ],
  title: "Extraction (2)",
  episodeType: "standard",
  stillPath: "/ijpxFliqoJPygtIUe8W5abc2lXn.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:42:57.028Z",
  updatedAt: "2026-10-29T15:42:57.028Z",
} as const satisfies Episode
