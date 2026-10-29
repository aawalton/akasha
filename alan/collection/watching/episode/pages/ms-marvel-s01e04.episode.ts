import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const msMarvelS01e04 = {
  id: "01a1887e-e2dd-737f-b5ab-af4ec2b4404e",
  type: "page-type/episode",
  slug: "ms-marvel-s01e04",
  description:
    "Kamala travels around the world to solve the mystery of the bangle and her family’s history.",
  ownLength: 48,
  ownProgress: 48,
  partOfCollections: ["season/ms-marvel-miniseries"],
  position: 4,
  publishedAt: "2022-06-29",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3603691",
      externalLink: "https://www.themoviedb.org/tv/92782/season/1/episode/4",
    },
  ],
  title: "Seeing Red",
  episodeType: "standard",
  stillPath: "/aRR3GD9S2yHeVG7CCV5M1DTWHJc.jpg",
  voteAverage: 5.4,
  createdAt: "2026-10-29T16:29:39.421Z",
  updatedAt: "2026-10-29T16:29:39.421Z",
} as const satisfies Episode
