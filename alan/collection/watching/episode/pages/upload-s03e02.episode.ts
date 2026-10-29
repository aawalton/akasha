import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const uploadS03e02 = {
  id: "01a18859-6798-7a7c-bbb5-ca0b1e3203c2",
  type: "page-type/episode",
  slug: "upload-s03e02",
  description:
    "Nathan and Nora struggle to make their relationship work, while Ingrid tries to make the best of her second shot at love.",
  ownLength: 35,
  ownProgress: 0,
  partOfCollections: ["season/upload-season-3"],
  position: 2,
  publishedAt: "2023-10-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4670012",
      externalLink: "https://www.themoviedb.org/tv/86248/season/3/episode/2",
    },
  ],
  title: "Strawberry",
  episodeType: "standard",
  stillPath: "/7ZcE9EG810gcgzbANYUw8kMExiZ.jpg",
  voteAverage: 6.3,
  createdAt: "2026-10-29T15:48:43.031Z",
  updatedAt: "2026-10-29T15:48:43.031Z",
} as const satisfies Episode
