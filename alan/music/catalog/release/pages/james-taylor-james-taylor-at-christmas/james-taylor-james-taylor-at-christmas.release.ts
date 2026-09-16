import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jamesTaylorJamesTaylorAtChristmas = {
  id: "01a0abeb-2c12-752a-a109-9bf25539a572",
  type: "page-type/release",
  slug: "james-taylor-james-taylor-at-christmas",
  ownLength: 54.63015,
  ownProgress: 0,
  partOfCollections: ["artist/james-taylor"],
  position: 0,
  publishedAt: "2004-11-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "47MUlaylxBqDFYt2HIvPaL",
      externalLink: "https://open.spotify.com/album/47MUlaylxBqDFYt2HIvPaL",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "James Taylor At Christmas",
} as const satisfies Release
