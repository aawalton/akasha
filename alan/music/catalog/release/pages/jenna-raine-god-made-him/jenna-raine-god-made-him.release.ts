import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jennaRaineGodMadeHim = {
  id: "01a0c621-17ac-7076-80bf-b1cdd2a5d105",
  type: "page-type/release",
  slug: "jenna-raine-god-made-him",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jenna-raine"],
  position: 0,
  publishedAt: "2026-07-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6jaPkauQzuYdbSCWorAJk6",
      externalLink: "https://open.spotify.com/album/6jaPkauQzuYdbSCWorAJk6",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "God Made Him",
} as const satisfies Release
