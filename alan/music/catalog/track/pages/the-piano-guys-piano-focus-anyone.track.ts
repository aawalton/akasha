import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysPianoFocusAnyone = {
  id: "01a0afa1-c39e-74b2-a781-d8847691866b",
  type: "page-type/track",
  slug: "the-piano-guys-piano-focus-anyone",
  ownLength: 3.6998,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-piano-focus"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6QRLIaRPm8gUN6cl6cY1LQ",
      externalLink: "https://open.spotify.com/track/6QRLIaRPm8gUN6cl6cY1LQ",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Anyone",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "anyone|0jW6R8CVyVohuUJVcuweDI|221988",
} as const satisfies Track
