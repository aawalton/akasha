import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3Unstoppable2InTheStars = {
  id: "01a0afa1-dac4-712a-abf6-f1bb9f393670",
  type: "page-type/track",
  slug: "the-piano-guys-3-unstoppable-2-in-the-stars",
  ownLength: 3.6346,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-unstoppable-2"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7wZ8Fr8qK8a2VVH5ZaAisA",
      externalLink: "https://open.spotify.com/track/7wZ8Fr8qK8a2VVH5ZaAisA",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "In The Stars",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "inthestars|0jW6R8CVyVohuUJVcuweDI|218076",
  song: "song/the-piano-guys-in-the-stars",
} as const satisfies Track
