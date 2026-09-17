import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuysSerenity = {
  id: "01a0afa2-0823-7175-8899-c88f3737037f",
  type: "page-type/release",
  slug: "the-piano-guys-serenity",
  ownLength: 60.83968333333333,
  ownProgress: 0,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2021-10-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7xfuaEeNLc8gP1DFdbiQ4n",
      externalLink: "https://open.spotify.com/album/7xfuaEeNLc8gP1DFdbiQ4n",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Serenity",
} as const satisfies Release
