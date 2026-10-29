import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const torchwoodS01e02 = {
  id: "01a18859-3c68-78a7-ae96-2325467482fe",
  type: "page-type/episode",
  slug: "torchwood-s01e02",
  description:
    "It's Gwen's first day on the job, and it's not going very well. After accidentally releasing a mysterious gas from a comet that landed, a new type of alien is let loose on the streets - an alien that's addicted to sex. Torchwood must find the inhabited body, and prevent anymore deaths from the violent form of sex.",
  ownLength: 48,
  ownProgress: 0,
  partOfCollections: ["season/torchwood-season-1"],
  position: 2,
  publishedAt: "2006-10-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "21569",
      externalLink: "https://www.themoviedb.org/tv/424/season/1/episode/2",
    },
  ],
  title: "Day One",
  episodeType: "standard",
  stillPath: "/zPYOwOBcOn5cF7B9cSVHC6A8ghO.jpg",
  voteAverage: 6,
  createdAt: "2026-10-29T15:48:31.976Z",
  updatedAt: "2026-10-29T15:48:31.976Z",
} as const satisfies Episode
