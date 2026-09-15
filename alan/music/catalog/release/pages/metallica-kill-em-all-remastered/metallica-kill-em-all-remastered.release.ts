import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const metallicaKillEmAllRemastered = {
  id: "01a0676a-d722-7041-b239-6736357c286a",
  type: "release",
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
} as const satisfies Release
