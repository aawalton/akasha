import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const ellaHendersonGlow = {
  id: "01a0676a-d71f-7007-9a27-5b555b6aad88",
  type: "release",
  slug: "ella-henderson-glow",
  title: "Glow",
  partOfCollections: ["artist/ella-henderson"],
  position: 0,
  ownLength: 3.8091,
  ownProgress: 3.8091,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2014-09-22",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5yGLjvZtaCbgryBobK5R1h",
      externalLink: "https://open.spotify.com/album/5yGLjvZtaCbgryBobK5R1h",
      lastSyncedAt: "2026-02-19",
    },
  ],
} as const satisfies Release
