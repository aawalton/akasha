import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const ellaHendersonHurricane = {
  id: "01a0676a-d720-7075-b909-3eaf63cdfc0e",
  type: "page-type/release",
  slug: "ella-henderson-hurricane",
  title: "Hurricane",
  partOfCollections: ["artist/ella-henderson"],
  position: 0,
  ownLength: 6.2962,
  ownProgress: 6.2962,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2021-09-17",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "06J9dABYtcM4blnT4cIpsS",
      externalLink: "https://open.spotify.com/album/06J9dABYtcM4blnT4cIpsS",
      lastSyncedAt: "2026-02-19",
    },
  ],
} as const satisfies Release
