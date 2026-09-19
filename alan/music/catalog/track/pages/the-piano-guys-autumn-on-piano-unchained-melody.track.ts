import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysAutumnOnPianoUnchainedMelody = {
  id: "01a0afa1-c020-73a3-b660-7461ad5100fd",
  type: "page-type/track",
  slug: "the-piano-guys-autumn-on-piano-unchained-melody",
  ownLength: 3.0182,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-autumn-on-piano"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3K20qHUEXMPdfkcekEW6f0",
      externalLink: "https://open.spotify.com/track/3K20qHUEXMPdfkcekEW6f0",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Unchained Melody",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "unchainedmelody|0jW6R8CVyVohuUJVcuweDI|181092",
  song: "song/the-piano-guys-unchained-melody",
} as const satisfies Track
