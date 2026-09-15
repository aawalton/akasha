import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const ellaHendersonGhostRemixes = {
  id: "01a0676a-d71e-7059-8405-d99a13e4ad7c",
  type: "page-type/release",
  slug: "ella-henderson-ghost-remixes",
  title: "Ghost (Remixes)",
  partOfCollections: ["artist/ella-henderson"],
  position: 0,
  ownLength: 12.34755,
  ownProgress: 12.34755,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2014-06-08",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "40Rs6HcEc6Juj0FBeMa86M",
      externalLink: "https://open.spotify.com/album/40Rs6HcEc6Juj0FBeMa86M",
      lastSyncedAt: "2026-02-19",
    },
  ],
} as const satisfies Release
