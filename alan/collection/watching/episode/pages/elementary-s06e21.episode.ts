import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const elementaryS06e21 = {
  id: "01a1887e-62af-78ee-9e0c-1dc86c30d6d3",
  type: "page-type/episode",
  slug: "elementary-s06e21",
  description:
    "Holmes and Watson face their greatest challenge to date when a murder investigation threatens to destroy their partnership.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/elementary-season-6"],
  position: 21,
  publishedAt: "2018-09-17",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1559323",
      externalLink: "https://www.themoviedb.org/tv/1415/season/6/episode/21",
    },
  ],
  title: "Whatever Remains, However Improbable",
  episodeType: "finale",
  stillPath: "/fqvpdbUCCz3z5V9b8Ryc1mZP1sJ.jpg",
  voteAverage: 8.7,
  createdAt: "2026-10-29T16:29:06.597Z",
  updatedAt: "2026-10-29T16:29:06.597Z",
} as const satisfies Episode
