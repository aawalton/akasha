import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const bleachS01e01 = {
  id: "01a183d3-f46c-72fb-9bd9-8abf49c8076c",
  type: "page-type/episode",
  slug: "bleach-s01e01",
  description:
    "Fifteen-year-old Ichigo Kurosaki has the uncanny ability to see ghosts, but otherwise lives an ordinary life. However, once a Shinigami named Rukia Kuchiki appears before him, everything changes.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/bleach-season-1"],
  position: 1,
  publishedAt: "2004-10-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "750573",
      externalLink: "https://www.themoviedb.org/tv/30984/season/1/episode/1",
    },
  ],
  title: "The Day I Became a Shinigami",
  episodeType: "standard",
  stillPath: "/euMG2K90juZdDVq4rdOLUuMLmmQ.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-28T18:44:28.395Z",
  updatedAt: "2026-10-28T18:44:28.395Z",
} as const satisfies Episode
