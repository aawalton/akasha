import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMentalistS03e12 = {
  id: "01a18880-75e8-7cac-8d53-b698f9aee48e",
  type: "page-type/episode",
  slug: "the-mentalist-s03e12",
  description:
    "When Patrick Jane and the CBI must work with a criminal profiler, Dr. Montague, to solve a double murder, it becomes a competition for Jane to prove that his methods are superior.",
  ownLength: 42,
  ownProgress: 42,
  partOfCollections: ["season/the-mentalist-season-3"],
  position: 12,
  publishedAt: "2011-01-20",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "367749",
      externalLink: "https://www.themoviedb.org/tv/5920/season/3/episode/12",
    },
  ],
  title: "Bloodhounds",
  episodeType: "standard",
  stillPath: "/saJm9EsCcE80LA6AIDvxFpqRguj.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T16:31:22.596Z",
  updatedAt: "2026-10-29T16:31:22.596Z",
} as const satisfies Episode
