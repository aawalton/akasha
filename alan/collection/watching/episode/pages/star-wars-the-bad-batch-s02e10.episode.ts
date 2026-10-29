import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsTheBadBatchS02e10 = {
  id: "01a18854-2006-741b-bcc0-2e6b36d5882c",
  type: "page-type/episode",
  slug: "star-wars-the-bad-batch-s02e10",
  description: "Attempting to recover a lost asset, the Batch must learn to trust a thief.",
  ownLength: 29,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-the-bad-batch-season-2"],
  position: 10,
  publishedAt: "2023-02-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4094488",
      externalLink: "https://www.themoviedb.org/tv/105971/season/2/episode/10",
    },
  ],
  title: "Retrieval",
  episodeType: "standard",
  stillPath: "/9ZdpX6fjKyw5nRoAbYrT74Uuf7R.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-29T15:42:57.028Z",
  updatedAt: "2026-10-29T15:42:57.028Z",
} as const satisfies Episode
