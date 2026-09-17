import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3ClassicalLoveRomance = {
  id: "01a0676a-d71a-7057-bcad-c59b7cf0f0c8",
  type: "page-type/release",
  slug: "the-piano-guys-3-classical-love-romance",
  ownLength: 33.57576666666667,
  ownProgress: 33.575767,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2025-10-17",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4HOeEiJlXRA7ISl7k9AaKb",
      externalLink: "https://open.spotify.com/album/4HOeEiJlXRA7ISl7k9AaKb",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Classical Love & Romance",
} as const satisfies Release
