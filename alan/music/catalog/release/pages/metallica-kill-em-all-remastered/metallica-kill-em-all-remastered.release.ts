import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const metallicaKillEmAllRemastered = {
  id: "01a0676a-d722-7041-b239-6736357c286a",
  type: "page-type/release",
  slug: "metallica-kill-em-all-remastered",
  title: "Kill 'Em All (Remastered)",
  partOfCollections: ["artist/metallica"],
  position: 0,
  ownLength: 51.244833,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1983-07-25",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0vNBQof86Lv5gLuf26ML7o",
      externalLink: "https://open.spotify.com/album/0vNBQof86Lv5gLuf26ML7o",
    },
  ],
  createdAt: "2026-09-03T13:17:30.274Z",
  updatedAt: "2026-09-15T16:37:53.000Z",
} as const satisfies Release
