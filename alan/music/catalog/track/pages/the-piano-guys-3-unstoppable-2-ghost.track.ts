import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3Unstoppable2Ghost = {
  id: "01a0afa1-da3c-7215-8025-d423b9af3160",
  type: "page-type/track",
  slug: "the-piano-guys-3-unstoppable-2-ghost",
  ownLength: 3.4423,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-unstoppable-2"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5wOPyVLxlcrZz0jwIclW3I",
      externalLink: "https://open.spotify.com/track/5wOPyVLxlcrZz0jwIclW3I",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Ghost",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "ghost|0jW6R8CVyVohuUJVcuweDI|206538",
  song: "song/the-piano-guys-ghost",
} as const satisfies Track
