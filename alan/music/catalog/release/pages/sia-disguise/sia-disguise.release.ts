import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const siaDisguise = {
  id: "01a0a59b-f1ce-7c77-bc04-dc885836a2c9",
  type: "page-type/release",
  slug: "sia-disguise",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/sia"],
  position: 0,
  publishedAt: "2026-08-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "64bs9S7CRMTn34hHlILPp0",
      externalLink: "https://open.spotify.com/album/64bs9S7CRMTn34hHlILPp0",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "DISGUISE",
  createdAt: "2026-09-15T15:07:35.758Z",
  updatedAt: "2026-10-20T14:01:30.339Z",
} as const satisfies Release
