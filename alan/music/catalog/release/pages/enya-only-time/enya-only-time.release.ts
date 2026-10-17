import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const enyaOnlyTime = {
  id: "01a0676a-d726-703a-82d2-7c9ce0f5fa04",
  type: "page-type/release",
  slug: "enya-only-time",
  title: "Only Time",
  partOfCollections: ["artist/enya"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2000-11-21",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0c4CTDOVv8MAU2T2znmhra",
      externalLink: "https://open.spotify.com/album/0c4CTDOVv8MAU2T2znmhra",
    },
  ],
  createdAt: "2026-09-03T13:17:30.278Z",
  updatedAt: "2026-10-17T14:01:01.286Z",
} as const satisfies Release
