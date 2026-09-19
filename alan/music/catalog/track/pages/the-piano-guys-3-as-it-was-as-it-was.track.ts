import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3AsItWasAsItWas = {
  id: "01a0afa1-ff23-70bd-b900-90585a978974",
  type: "page-type/track",
  slug: "the-piano-guys-3-as-it-was-as-it-was",
  ownLength: 2.6954,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-as-it-was"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "71pz5tgYsXTUSvWDcswYSb",
      externalLink: "https://open.spotify.com/track/71pz5tgYsXTUSvWDcswYSb",
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
