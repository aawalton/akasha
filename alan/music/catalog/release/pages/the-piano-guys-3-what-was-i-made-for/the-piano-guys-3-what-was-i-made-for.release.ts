import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3WhatWasIMadeFor = {
  id: "01a0676a-d730-704b-b10d-864c54f7a3af",
  type: "page-type/release",
  slug: "the-piano-guys-3-what-was-i-made-for",
  ownLength: 8.15785,
  ownProgress: 8.15785,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2024-02-23",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3rs8QYKlnbHrPIdxbCXIXI",
      externalLink: "https://open.spotify.com/album/3rs8QYKlnbHrPIdxbCXIXI",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "What Was I Made For?",
} as const satisfies Release
