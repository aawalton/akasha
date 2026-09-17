import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3SoFarSoGoodAllOfMe = {
  id: "01a0afa2-1c3c-7a9a-a736-48c5df9c7c0b",
  type: "page-type/track",
  slug: "the-piano-guys-3-so-far-so-good-all-of-me",
  ownLength: 3.058666666666667,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-so-far-so-good"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6Br4baYuVyuNOmQRhuMqFI",
      externalLink: "https://open.spotify.com/track/6Br4baYuVyuNOmQRhuMqFI",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "All of Me",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "allofme|0jW6R8CVyVohuUJVcuweDI|183520",
} as const satisfies Track
