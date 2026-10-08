import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const elvisPresley2Speedway = {
  id: "01a0676a-d729-707b-b433-6bf266675d7d",
  type: "page-type/release",
  slug: "elvis-presley-2-speedway",
  title: "Speedway",
  partOfCollections: ["artist/elvis-presley"],
  position: 0,
  ownLength: 27.922833,
  ownProgress: 27.922833,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "1968-05-20",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "27rnGQx6avdqjPq8gtKs7D",
      externalLink: "https://open.spotify.com/album/27rnGQx6avdqjPq8gtKs7D",
    },
  ],
  createdAt: "2026-09-03T13:17:30.281Z",
  updatedAt: "2026-09-15T16:35:10.000Z",
} as const satisfies Release
