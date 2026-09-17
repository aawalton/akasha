import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuysAutumnOnPiano = {
  id: "01a0afa1-bf23-71ad-a3c9-971537b1d134",
  type: "page-type/release",
  slug: "the-piano-guys-autumn-on-piano",
  ownLength: 46.56445,
  ownProgress: 0,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2026-08-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3oeU1VwaVD8sLgPwhZWSlw",
      externalLink: "https://open.spotify.com/album/3oeU1VwaVD8sLgPwhZWSlw",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Autumn on Piano",
} as const satisfies Release
