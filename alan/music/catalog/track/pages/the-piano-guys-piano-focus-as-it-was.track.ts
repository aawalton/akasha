import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysPianoFocusAsItWas = {
  id: "01a0afa1-c2cf-722b-a48e-ef4ae81b0cad",
  type: "page-type/track",
  slug: "the-piano-guys-piano-focus-as-it-was",
  ownLength: 2.6954,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-piano-focus"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2qqJwGoeDqqXJ9qQnxpzHZ",
      externalLink: "https://open.spotify.com/track/2qqJwGoeDqqXJ9qQnxpzHZ",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "As It Was",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "asitwas|0jW6R8CVyVohuUJVcuweDI|161724",
  song: "song/the-piano-guys-as-it-was",
} as const satisfies Track
