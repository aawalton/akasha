import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const onePieceS01e52 = {
  id: "01a18884-52e7-7127-9c3f-6f5215894044",
  type: "page-type/episode",
  slug: "one-piece-s01e52",
  description:
    "Luffy arrives at the execution platform only to be caught in a trap by Buggy and Alvida.",
  ownLength: 25,
  ownProgress: 25,
  partOfCollections: ["season/one-piece-season-1"],
  position: 52,
  publishedAt: "2000-12-13",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1153023",
      externalLink: "https://www.themoviedb.org/tv/37854/season/1/episode/52",
    },
  ],
  title: "Buggy's Revenge! The Man Who Smiles On the Execution Platform!",
  episodeType: "standard",
  stillPath: "/kA7mSWeR3xI60RczrROyDZQadmL.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T16:35:35.779Z",
  updatedAt: "2026-10-29T16:35:35.779Z",
} as const satisfies Episode
