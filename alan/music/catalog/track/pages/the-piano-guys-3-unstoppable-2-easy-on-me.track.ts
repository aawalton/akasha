import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3Unstoppable2EasyOnMe = {
  id: "01a0afa1-daa3-7c11-a3b4-fc862bfc654e",
  type: "page-type/track",
  slug: "the-piano-guys-3-unstoppable-2-easy-on-me",
  ownLength: 2.9859,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-unstoppable-2"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3gXgHus2I2Z2LzUgISqCap",
      externalLink: "https://open.spotify.com/track/3gXgHus2I2Z2LzUgISqCap",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Easy On Me",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "easyonme|0jW6R8CVyVohuUJVcuweDI|179154",
} as const satisfies Track
