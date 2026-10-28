import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const nanaS01e01 = {
  id: "01a183d5-6775-73a5-afbc-28057f66b2ba",
  type: "page-type/episode",
  slug: "nana-s01e01",
  description:
    "Nana recalls the first time she meet the other Nana on the train while traveling to Tokyo.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/nana-season-1"],
  position: 1,
  publishedAt: "2006-04-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "939462",
      externalLink: "https://www.themoviedb.org/tv/56568/season/1/episode/1",
    },
  ],
  title: "Prologue: Nana and NANA",
  episodeType: "standard",
  stillPath: "/jXkop5KO8BV3yARnQDUdzYvejue.jpg",
  voteAverage: 10,
  createdAt: "2026-10-28T18:46:03.381Z",
  updatedAt: "2026-10-28T18:46:03.381Z",
} as const satisfies Episode
