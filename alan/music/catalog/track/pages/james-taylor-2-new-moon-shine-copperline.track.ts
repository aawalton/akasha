import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2NewMoonShineCopperline = {
  id: "01a0abeb-3f44-7c22-b08e-d448e0de4e6e",
  type: "page-type/track",
  slug: "james-taylor-2-new-moon-shine-copperline",
  ownLength: 4.354416666666666,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-new-moon-shine"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0i1XtQ6hOET96dz5oG45zl",
      externalLink: "https://open.spotify.com/track/0i1XtQ6hOET96dz5oG45zl",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Copperline",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "copperline|0vn7UBvSQECKJm2817Yf1P|261265",
} as const satisfies Track
