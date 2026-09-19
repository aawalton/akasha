import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3Unstoppable2CarmensLibertango = {
  id: "01a0afa1-dbfb-7914-bb81-4fcf8e977485",
  type: "page-type/track",
  slug: "the-piano-guys-3-unstoppable-2-carmens-libertango",
  ownLength: 2.7695833333333333,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-unstoppable-2"],
  position: 16,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6SzaEWfG0fTxDWVY3WL6t5",
      externalLink: "https://open.spotify.com/track/6SzaEWfG0fTxDWVY3WL6t5",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Carmen's Libertango",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "carmenslibertango|0jW6R8CVyVohuUJVcuweDI|166175",
  song: "song/the-piano-guys-carmens-libertango",
} as const satisfies Track
