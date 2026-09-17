import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3Mistletoe = {
  id: "01a0676a-d724-707a-b54b-de7cd5fc45ec",
  type: "page-type/release",
  slug: "the-piano-guys-3-mistletoe",
  ownLength: 4.78135,
  ownProgress: 4.781333,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2022-12-09",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "52fTmNCrigx2W9VfTVm8mG",
      externalLink: "https://open.spotify.com/album/52fTmNCrigx2W9VfTVm8mG",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Mistletoe",
} as const satisfies Release
