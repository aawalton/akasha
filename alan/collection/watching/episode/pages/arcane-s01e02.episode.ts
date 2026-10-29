import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const arcaneS01e02 = {
  id: "01a1887d-dc25-7c9f-a6b5-e24a9d6c7a54",
  type: "page-type/episode",
  slug: "arcane-s01e02",
  description:
    "Idealistic inventor Jayce attempts to harness magic through science—despite his mentor's warnings. Criminal kingpin Silco tests a powerful substance.",
  ownLength: 41,
  ownProgress: 41,
  partOfCollections: ["season/arcane-season-1"],
  position: 2,
  publishedAt: "2021-11-06",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3241290",
      externalLink: "https://www.themoviedb.org/tv/94605/season/1/episode/2",
    },
  ],
  title: "Some Mysteries Are Better Left Unsolved",
  episodeType: "standard",
  stillPath: "/1uubdoW7nPtpYS6T59COLEKDB7A.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T16:28:32.165Z",
  updatedAt: "2026-10-29T16:28:32.165Z",
} as const satisfies Episode
