import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysRelaxingPianoUnchainedMelody = {
  id: "01a0afa1-cc4b-701d-a266-5735109e1266",
  type: "page-type/track",
  slug: "the-piano-guys-relaxing-piano-unchained-melody",
  ownLength: 3.0182,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-relaxing-piano"],
  position: 16,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7LMgBuwvqaEskepGMajzCL",
      externalLink: "https://open.spotify.com/track/7LMgBuwvqaEskepGMajzCL",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Unchained Melody",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "unchainedmelody|0jW6R8CVyVohuUJVcuweDI|181092",
} as const satisfies Track
