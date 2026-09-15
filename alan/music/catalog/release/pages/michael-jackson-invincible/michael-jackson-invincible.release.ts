import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const michaelJacksonInvincible = {
  id: "01a0676a-d721-707e-ba47-231abfbb44a4",
  type: "page-type/release",
  slug: "michael-jackson-invincible",
  title: "Invincible",
  partOfCollections: ["artist/michael-jackson"],
  position: 0,
  ownLength: 76.923283,
  ownProgress: 76.923283,
  unit: "unit/minutes",
  status: "completed",
  rank: "C",
  publishedAt: "2001-10-29",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "52E4RP7XDzalpIrOgSTgiQ",
      externalLink: "https://open.spotify.com/album/52E4RP7XDzalpIrOgSTgiQ",
      lastSyncedAt: "2025-10-04",
    },
  ],
} as const satisfies Release
