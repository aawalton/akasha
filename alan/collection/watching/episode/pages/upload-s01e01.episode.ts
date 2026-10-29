import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const uploadS01e01 = {
  id: "01a18859-6797-7a6b-a45d-9ef42de876ff",
  type: "page-type/episode",
  slug: "upload-s01e01",
  description:
    "After a self-driving car crash, Nathan is uploaded to Lakeview, his girlfriend’s family’s digital after-life, where he meets his customer service rep, Nora.",
  ownLength: 47,
  ownProgress: 0,
  partOfCollections: ["season/upload-season-1"],
  position: 1,
  publishedAt: "2020-04-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1687191",
      externalLink: "https://www.themoviedb.org/tv/86248/season/1/episode/1",
    },
  ],
  title: "Welcome to Upload",
  episodeType: "standard",
  stillPath: "/uG9nfQcpMNRmZcHYjuntwQPRTld.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:48:43.031Z",
  updatedAt: "2026-10-29T15:48:43.031Z",
} as const satisfies Episode
