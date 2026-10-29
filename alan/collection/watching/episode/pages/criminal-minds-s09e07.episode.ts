import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS09e07 = {
  id: "01a18844-d7f1-7aaf-8360-7309090d705d",
  type: "page-type/episode",
  slug: "criminal-minds-s09e07",
  description:
    "Though Rossi is sad because his favorite bar is closing, the team goes to Boston to solve a series of strangulations.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-9"],
  position: 7,
  publishedAt: "2013-11-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "283457",
      externalLink: "https://www.themoviedb.org/tv/4057/season/9/episode/7",
    },
  ],
  title: "Gatekeeper",
  episodeType: "standard",
  stillPath: "/hm0v3IdzhnF1IJc7ySD6Hy8Okwx.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
