import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3WeddingSeason = {
  id: "01a0676a-d730-703a-9fd0-45f07c64e3ba",
  type: "page-type/release",
  slug: "the-piano-guys-3-wedding-season",
  ownLength: 70.8394,
  ownProgress: 70.8394,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2025-05-09",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2XC4gZovmY6hUlEgu7CRg2",
      externalLink: "https://open.spotify.com/album/2XC4gZovmY6hUlEgu7CRg2",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Wedding Season",
} as const satisfies Release
