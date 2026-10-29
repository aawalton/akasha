import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theRookieS05e05 = {
  id: "01a18885-4806-7446-a798-558e63d5e191",
  type: "page-type/episode",
  slug: "the-rookie-s05e05",
  description:
    "Officer John Nolan and Officer Celina Juarez are on the hunt for a fugitive after a car incident goes awry. Meanwhile, a past injury comes to haunt Tim and Lucy comes through during his time in need in more ways than one.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/the-rookie-season-5"],
  position: 5,
  publishedAt: "2022-10-23",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3979307",
      externalLink: "https://www.themoviedb.org/tv/79744/season/5/episode/5",
    },
  ],
  title: "The Fugitive",
  episodeType: "standard",
  stillPath: "/9b8Gz1y7t2WZq6lpXjaJ1U071Hh.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T16:36:38.529Z",
  updatedAt: "2026-10-29T16:36:38.529Z",
} as const satisfies Episode
