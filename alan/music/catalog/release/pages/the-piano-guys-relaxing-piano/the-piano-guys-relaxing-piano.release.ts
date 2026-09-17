import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuysRelaxingPiano = {
  id: "01a0afa1-ca4b-7cd9-ab43-fabfcdce9d9d",
  type: "page-type/release",
  slug: "the-piano-guys-relaxing-piano",
  ownLength: 61.637766666666664,
  ownProgress: 0,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2026-06-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1avg0CTNeTva2hcWFblkLF",
      externalLink: "https://open.spotify.com/album/1avg0CTNeTva2hcWFblkLF",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Relaxing Piano",
} as const satisfies Release
