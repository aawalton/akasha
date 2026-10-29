import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const whiteCollarS03e03 = {
  id: "01a18881-51a1-7200-9db6-e4e22fc20d9b",
  type: "page-type/episode",
  slug: "white-collar-s03e03",
  description:
    "Diana goes undercover to protect a magazine journalist; Peter and Neal investigate a pharmaceutical company.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/white-collar-season-3"],
  position: 3,
  publishedAt: "2011-06-21",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "596277",
      externalLink: "https://www.themoviedb.org/tv/21510/season/3/episode/3",
    },
  ],
  title: "Deadline",
  episodeType: "standard",
  stillPath: "/6GrGcb0mBhuCFLQOKXpUVCbpUPF.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T16:32:18.847Z",
  updatedAt: "2026-10-29T16:32:18.847Z",
} as const satisfies Episode
