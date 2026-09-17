import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3PopOnPianoPerfect = {
  id: "01a0afa1-cf77-7945-a636-25f936dde4df",
  type: "page-type/track",
  slug: "the-piano-guys-3-pop-on-piano-perfect",
  ownLength: 5.141666666666667,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-pop-on-piano"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7sflRilNpQtJr7LKbFImet",
      externalLink: "https://open.spotify.com/track/7sflRilNpQtJr7LKbFImet",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Perfect",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "perfect|0jW6R8CVyVohuUJVcuweDI|308500",
} as const satisfies Track
