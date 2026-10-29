import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const whiteCollarS05e05 = {
  id: "01a18881-51a3-76ad-ad05-7acd7fab620b",
  type: "page-type/episode",
  slug: "white-collar-s05e05",
  description:
    "Neal must go undercover as a butler to expose an imposter who aims to inherit a Manhattan family's fortune.",
  ownLength: 42,
  ownProgress: 42,
  partOfCollections: ["season/white-collar-season-5"],
  position: 5,
  publishedAt: "2013-11-14",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "596315",
      externalLink: "https://www.themoviedb.org/tv/21510/season/5/episode/5",
    },
  ],
  title: "Master Plan",
  episodeType: "standard",
  stillPath: "/tuSqax9RzLMcbPRQLlCg8QjhLCW.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T16:32:18.847Z",
  updatedAt: "2026-10-29T16:32:18.847Z",
} as const satisfies Episode
