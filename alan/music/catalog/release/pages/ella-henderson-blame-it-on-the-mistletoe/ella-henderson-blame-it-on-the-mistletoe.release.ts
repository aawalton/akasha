import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const ellaHendersonBlameItOnTheMistletoe = {
  id: "01a0676a-d719-7014-8d05-f2811175bc1e",
  type: "page-type/release",
  slug: "ella-henderson-blame-it-on-the-mistletoe",
  title: "Blame It On The Mistletoe",
  partOfCollections: ["artist/ella-henderson"],
  position: 0,
  ownLength: 3.09565,
  ownProgress: 3.09565,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2020-12-04",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3MuX8Afd4KC0kGIBOstzxs",
      externalLink: "https://open.spotify.com/album/3MuX8Afd4KC0kGIBOstzxs",
      lastSyncedAt: "2026-02-19",
    },
  ],
} as const satisfies Release
