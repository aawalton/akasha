import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jisooEyesClosedWithZayn = {
  id: "01a0676a-d71d-7057-b7b3-885c3a918af1",
  type: "page-type/release",
  slug: "jisoo-eyes-closed-with-zayn",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jisoo"],
  position: 0,
  publishedAt: "2025-10-10",
  rank: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3LOalJiwqPsviLuoNboNfc",
      externalLink: "https://open.spotify.com/album/3LOalJiwqPsviLuoNboNfc",
      lastSyncedAt: "2025-11-24",
    },
  ],
  title: "EYES CLOSED (with ZAYN)",
} as const satisfies Release
