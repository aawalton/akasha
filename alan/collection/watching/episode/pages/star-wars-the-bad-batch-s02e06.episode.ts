import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsTheBadBatchS02e06 = {
  id: "01a18854-2006-7415-929b-5ef8486aa2dc",
  type: "page-type/episode",
  slug: "star-wars-the-bad-batch-s02e06",
  description: "The Bad Batch helps bring a new friend home.",
  ownLength: 28,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-the-bad-batch-season-2"],
  position: 6,
  publishedAt: "2023-02-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4094484",
      externalLink: "https://www.themoviedb.org/tv/105971/season/2/episode/6",
    },
  ],
  title: "Tribe",
  episodeType: "standard",
  stillPath: "/oT1p8kpv6LrZYS3rDgAFtcTuwXa.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:42:57.028Z",
  updatedAt: "2026-10-29T15:42:57.028Z",
} as const satisfies Episode
