import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMentalistS05e01 = {
  id: "01a18880-75ea-7b24-95c8-a133c439ad44",
  type: "page-type/episode",
  slug: "the-mentalist-s05e01",
  description:
    "While Jane tries to decipher Lorelei’s connection to Red John, the CBI team is forced to partner with the FBI to solve the murder of a hotel employee.",
  ownLength: 41,
  ownProgress: 41,
  partOfCollections: ["season/the-mentalist-season-5"],
  position: 1,
  publishedAt: "2012-09-30",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "367788",
      externalLink: "https://www.themoviedb.org/tv/5920/season/5/episode/1",
    },
  ],
  title: "The Crimson Ticket",
  episodeType: "standard",
  stillPath: "/vxGnPnb9wzz2D8Zeu5ty837cjYG.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T16:31:22.596Z",
  updatedAt: "2026-10-29T16:31:22.596Z",
} as const satisfies Episode
