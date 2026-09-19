import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3Unstoppable2AsItWas = {
  id: "01a0afa1-da1a-7ef8-8bf7-7c4bbb37505b",
  type: "page-type/track",
  slug: "the-piano-guys-3-unstoppable-2-as-it-was",
  ownLength: 2.6954,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-unstoppable-2"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0dZR2mNYHcX0qJNl2bVgYH",
      externalLink: "https://open.spotify.com/track/0dZR2mNYHcX0qJNl2bVgYH",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "As It Was",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "asitwas|0jW6R8CVyVohuUJVcuweDI|161724",
  song: "song/the-piano-guys-as-it-was",
} as const satisfies Track
