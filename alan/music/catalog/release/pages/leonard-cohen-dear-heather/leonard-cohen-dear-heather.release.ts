import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const leonardCohenDearHeather = {
  id: "01a0676a-d71b-7070-9a03-442b2603cc4f",
  type: "page-type/release",
  slug: "leonard-cohen-dear-heather",
  title: "Dear Heather",
  partOfCollections: ["artist/leonard-cohen"],
  position: 0,
  ownLength: 48.920167,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2004-10-26",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2A2w7NSKKyAfDvwx6GEHEg",
      externalLink: "https://open.spotify.com/album/2A2w7NSKKyAfDvwx6GEHEg",
      lastSyncedAt: "2025-10-10",
    },
  ],
  createdAt: "2026-09-03T13:17:30.267Z",
  updatedAt: "2026-09-15T16:37:27.000Z",
} as const satisfies Release
