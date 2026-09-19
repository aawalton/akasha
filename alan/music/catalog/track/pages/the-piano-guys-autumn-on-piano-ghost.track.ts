import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysAutumnOnPianoGhost = {
  id: "01a0afa1-c0c9-746d-bfdb-326628c747e5",
  type: "page-type/track",
  slug: "the-piano-guys-autumn-on-piano-ghost",
  ownLength: 3.4423,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-autumn-on-piano"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7GIhd5pHrVcwFGqkJFFW13",
      externalLink: "https://open.spotify.com/track/7GIhd5pHrVcwFGqkJFFW13",
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
