import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysPianoFocusInTheStars = {
  id: "01a0afa1-c2ee-7cfc-9c77-11f26e3c5d5f",
  type: "page-type/track",
  slug: "the-piano-guys-piano-focus-in-the-stars",
  ownLength: 3.6346,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-piano-focus"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3mz1dfIoOV8ICAAyIhuhPY",
      externalLink: "https://open.spotify.com/track/3mz1dfIoOV8ICAAyIhuhPY",
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
