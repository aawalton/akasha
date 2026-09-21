import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jessicaBaioSaveALittleLove = {
  id: "01a0c622-111a-7243-b27c-ec264cce1b05",
  type: "page-type/release",
  slug: "jessica-baio-save-a-little-love",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jessica-baio"],
  position: 0,
  publishedAt: "2026-04-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1dab4rFsugMRDL2GXK6ARN",
      externalLink: "https://open.spotify.com/album/1dab4rFsugMRDL2GXK6ARN",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Save A Little Love",
} as const satisfies Release
