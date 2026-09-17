import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuysClassicalForStudying = {
  id: "01a0afa1-c816-7097-b6b6-87c788e9488e",
  type: "page-type/release",
  slug: "the-piano-guys-classical-for-studying",
  ownLength: 54.47031666666667,
  ownProgress: 0,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2026-06-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6d34FeKrRrC58DRd4jF69p",
      externalLink: "https://open.spotify.com/album/6d34FeKrRrC58DRd4jF69p",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Classical for Studying",
} as const satisfies Release
