import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3Unstoppable2Unstoppable = {
  id: "01a0afa1-d9fa-78f0-9417-f3de7ac442b8",
  type: "page-type/track",
  slug: "the-piano-guys-3-unstoppable-2-unstoppable",
  ownLength: 2.5229833333333334,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-unstoppable-2"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "090f42AlEUVacfstqTmYCh",
      externalLink: "https://open.spotify.com/track/090f42AlEUVacfstqTmYCh",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Unstoppable",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "unstoppable|0jW6R8CVyVohuUJVcuweDI|151379",
  song: "song/the-piano-guys-unstoppable",
} as const satisfies Track
