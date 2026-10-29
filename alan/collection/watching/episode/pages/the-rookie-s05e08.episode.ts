import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theRookieS05e08 = {
  id: "01a18885-4806-7838-a7e1-7d3644ee5f61",
  type: "page-type/episode",
  slug: "the-rookie-s05e08",
  description:
    "Officers John Nolan and Celina Juarez are in a race against time to stop the source of an explosive rampage.",
  ownLength: 42,
  ownProgress: 42,
  partOfCollections: ["season/the-rookie-season-5"],
  position: 8,
  publishedAt: "2022-12-04",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4044606",
      externalLink: "https://www.themoviedb.org/tv/79744/season/5/episode/8",
    },
  ],
  title: "The Collar",
  episodeType: "standard",
  stillPath: "/oj6C0S79kyy2gT73jVxjTvEQU6D.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T16:36:38.529Z",
  updatedAt: "2026-10-29T16:36:38.529Z",
} as const satisfies Episode
