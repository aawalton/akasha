import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS20e03 = {
  id: "01a1884b-ef81-7725-a423-dd0d75568fb6",
  type: "page-type/episode",
  slug: "ncis-s20e03",
  description:
    "When a dead body is found at an ancient burial site that is thought to be cursed, the team tries to determine the motive and the symbolism behind the crime.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-20"],
  position: 3,
  publishedAt: "2022-10-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3951552",
      externalLink: "https://www.themoviedb.org/tv/4614/season/20/episode/3",
    },
  ],
  title: "Unearth",
  episodeType: "standard",
  stillPath: "/lPk6U7az1nF4l1xZ4dHxFwCCic5.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
