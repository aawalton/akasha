import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3FlickerFlicker = {
  id: "01a0afa2-1e2d-78b5-a6c7-d42e29d8a74b",
  type: "page-type/track",
  slug: "the-piano-guys-3-flicker-flicker",
  ownLength: 3.27555,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-flicker"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4IOl3FjbQ5gOysdEXhJlV2",
      externalLink: "https://open.spotify.com/track/4IOl3FjbQ5gOysdEXhJlV2",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Flicker",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "flicker|0jW6R8CVyVohuUJVcuweDI|196533",
  song: "song/the-piano-guys-flicker",
} as const satisfies Track
