import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaStarsEclipse = {
  id: "01a0a5b0-17ab-7fd3-b63e-7be8cd038996",
  type: "page-type/track",
  slug: "enya-stars-eclipse",
  ownLength: 1.54,
  ownProgress: 0,
  partOfCollections: ["release/enya-stars"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4sgNFWGvcn4oERDxrnjlXD",
      externalLink: "https://open.spotify.com/track/4sgNFWGvcn4oERDxrnjlXD",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Eclipse",
} as const satisfies Track
