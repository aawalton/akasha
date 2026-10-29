import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const youngSheldonS03e01 = {
  id: "01a1885a-252c-76ad-b6ba-d91532eda153",
  type: "page-type/episode",
  slug: "young-sheldon-s03e01",
  description:
    "After Dr. Sturgis experiences a nervous breakdown, Mary worries Sheldon is headed down a similar path. Also, Georgie discovers he has a knack for sales.",
  ownLength: 19,
  ownProgress: 0,
  partOfCollections: ["season/young-sheldon-season-3"],
  position: 1,
  publishedAt: "2019-09-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1879362",
      externalLink: "https://www.themoviedb.org/tv/71728/season/3/episode/1",
    },
  ],
  title: "Quirky Eggheads and Texas Snow Globes",
  episodeType: "standard",
  stillPath: "/7ByHZndMiJ77tOEKwxz6DeXBye3.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:49:31.561Z",
  updatedAt: "2026-10-29T15:49:31.561Z",
} as const satisfies Episode
