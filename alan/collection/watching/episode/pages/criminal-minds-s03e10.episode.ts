import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS03e10 = {
  id: "01a18844-d7e8-73be-addf-5b58bd7d5925",
  type: "page-type/episode",
  slug: "criminal-minds-s03e10",
  description:
    "The BAU and local authorities in Los Angeles investigate gang-related serial killings that might possibly involve a famous comic book artist.",
  ownLength: 40,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-3"],
  position: 10,
  publishedAt: "2007-11-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "283197",
      externalLink: "https://www.themoviedb.org/tv/4057/season/3/episode/10",
    },
  ],
  title: "True Night",
  episodeType: "standard",
  stillPath: "/wentmhbjRzUAWn5JzvGtGd903rB.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
