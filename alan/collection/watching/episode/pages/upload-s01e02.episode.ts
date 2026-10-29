import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const uploadS01e02 = {
  id: "01a18859-6797-7d1d-9c83-b59958774c95",
  type: "page-type/episode",
  slug: "upload-s01e02",
  description:
    "Nora tries to get her ratings up, so her boss will approve her dad’s upload loan. Nathan acclimates to his new world with the help of a Lakeview therapist.",
  ownLength: 31,
  ownProgress: 0,
  partOfCollections: ["season/upload-season-1"],
  position: 2,
  publishedAt: "2020-04-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2249643",
      externalLink: "https://www.themoviedb.org/tv/86248/season/1/episode/2",
    },
  ],
  title: "Five Stars",
  episodeType: "standard",
  stillPath: "/qMy0tq3oklqPkcWBTZJbDkVJLor.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:48:43.031Z",
  updatedAt: "2026-10-29T15:48:43.031Z",
} as const satisfies Episode
