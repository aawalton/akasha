import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS03e02 = {
  id: "01a18843-d153-7ed7-a1a0-a0bd50887d2a",
  type: "page-type/episode",
  slug: "bluey-s03e02",
  description:
    "Bluey is excited to get her own room. But when bed time comes, she misses Bingo more than she expected and must find a way to stay in touch with her sister.",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-3"],
  position: 2,
  publishedAt: "2021-11-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3348511",
      externalLink: "https://www.themoviedb.org/tv/82728/season/3/episode/2",
    },
  ],
  title: "Bedroom",
  episodeType: "standard",
  stillPath: "/m2onzCMfZVJ8a7CW8KpYSmz8iaa.jpg",
  voteAverage: 5.8,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
