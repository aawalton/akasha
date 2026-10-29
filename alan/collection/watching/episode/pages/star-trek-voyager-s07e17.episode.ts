import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS07e17 = {
  id: "01a18853-ac92-7845-a786-c1a225bd9d64",
  type: "page-type/episode",
  slug: "star-trek-voyager-s07e17",
  description:
    "Stardate: 54622.4 - It's up to Chakotay, Kim, and the Doctor to liberate the Voyager crew and help uncover a conspiracy of illegal labor practices.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-7"],
  position: 17,
  publishedAt: "2001-02-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4466843",
      externalLink: "https://www.themoviedb.org/tv/1855/season/7/episode/17",
    },
  ],
  title: "Workforce (2)",
  episodeType: "standard",
  stillPath: "/lQF01cyclYb6Q6QVmSxPOZQySxG.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
