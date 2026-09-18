import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraWorldOfWarcraftAPlaceToCallHome = {
  id: "01a0b637-eacb-732f-bff0-3f8f64cf4c35",
  type: "page-type/release",
  slug: "aurora-world-of-warcraft-a-place-to-call-home",
  ownLength: 2.1996333333333333,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2026-03-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0b7kTOdc4wZHCRMBUiVfp1",
      externalLink: "https://open.spotify.com/album/0b7kTOdc4wZHCRMBUiVfp1",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "World of Warcraft: A Place To Call Home",
} as const satisfies Release
