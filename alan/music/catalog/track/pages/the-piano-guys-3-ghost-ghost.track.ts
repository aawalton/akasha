import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3GhostGhost = {
  id: "01a0afa1-fbcb-7b91-98fa-7c2a5d6b335f",
  type: "page-type/track",
  slug: "the-piano-guys-3-ghost-ghost",
  ownLength: 3.4423,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-ghost"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "45BBPRiAGzrzm7hiy6WS8d",
      externalLink: "https://open.spotify.com/track/45BBPRiAGzrzm7hiy6WS8d",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Ghost",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "ghost|0jW6R8CVyVohuUJVcuweDI|206538",
  song: "song/the-piano-guys-ghost",
} as const satisfies Track
