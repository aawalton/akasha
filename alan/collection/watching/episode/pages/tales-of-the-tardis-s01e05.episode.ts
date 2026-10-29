import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const talesOfTheTardisS01e05 = {
  id: "01a18855-d686-7e4b-9e2d-de9773f3d8a5",
  type: "page-type/episode",
  slug: "tales-of-the-tardis-s01e05",
  description:
    "Steven and Vicki meet again and remember their first adventure battling a time-travelling Monk about to change the course of history in 1066.",
  ownLength: 97,
  ownProgress: 0,
  partOfCollections: ["season/tales-of-the-tardis-season-1"],
  position: 5,
  publishedAt: "2023-11-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4877017",
      externalLink: "https://www.themoviedb.org/tv/238486/season/1/episode/5",
    },
  ],
  title: "The Time Meddler",
  episodeType: "standard",
  stillPath: "/dlNDXDMxSSfmocRbhc1nLlqy6ux.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:44:49.285Z",
  updatedAt: "2026-10-29T15:44:49.285Z",
} as const satisfies Episode
