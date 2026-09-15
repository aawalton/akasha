import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const ellaHendersonYoursRemixes = {
  id: "01a0676a-d732-7026-b31f-edaf0be72dd2",
  type: "page-type/release",
  slug: "ella-henderson-yours-remixes",
  title: "Yours (Remixes)",
  partOfCollections: ["artist/ella-henderson"],
  position: 0,
  ownLength: 16.432883,
  ownProgress: 16.432883,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2014-12-12",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3sOVKUgtsij1MOnJ2dZezk",
      externalLink: "https://open.spotify.com/album/3sOVKUgtsij1MOnJ2dZezk",
      lastSyncedAt: "2026-02-19",
    },
  ],
} as const satisfies Release
