import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const nanaS01e15 = {
  id: "01a183d5-6777-700a-8e5c-e7d437a94f3b",
  type: "page-type/episode",
  slug: "nana-s01e15",
  description:
    "Nana's band, \"Blast\", are preparing for their first live concert. Hachi goes to see them and meets a strange girl connected with Nana's past.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/nana-season-1"],
  position: 15,
  publishedAt: "2006-07-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "939455",
      externalLink: "https://www.themoviedb.org/tv/56568/season/1/episode/15",
    },
  ],
  title: "Blast, First Live",
  episodeType: "standard",
  stillPath: "/lHAhIDBhh8mKq168gAaec3uv7jL.jpg",
  voteAverage: 8,
  createdAt: "2026-10-28T18:46:03.381Z",
  updatedAt: "2026-10-28T18:46:03.381Z",
} as const satisfies Episode
