import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jessicaBaioSacredIi = {
  id: "01a0c622-0e50-7df4-958e-8260aa89efc7",
  type: "page-type/release",
  slug: "jessica-baio-sacred-ii",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jessica-baio"],
  position: 0,
  publishedAt: "2026-04-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2IcviJDDxkE6ml2ZWDerZy",
      externalLink: "https://open.spotify.com/album/2IcviJDDxkE6ml2ZWDerZy",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "SACRED II",
} as const satisfies Release
