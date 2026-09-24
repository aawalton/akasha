import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const adeleHometownGlory = {
  id: "01a0676a-d720-7056-9aef-7efdd6dcf26e",
  type: "page-type/release",
  slug: "adele-hometown-glory",
  title: "Hometown Glory",
  partOfCollections: ["artist/adele"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2018-07-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1uT2pOgyFOXic7AyGCRCwx",
      externalLink: "https://open.spotify.com/album/1uT2pOgyFOXic7AyGCRCwx",
      lastSyncedAt: "2026-02-09",
    },
  ],
} as const satisfies Release
