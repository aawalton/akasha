import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysPianoFocusTime = {
  id: "01a0afa1-c288-7b99-8d91-4ce718696032",
  type: "page-type/track",
  slug: "the-piano-guys-piano-focus-time",
  ownLength: 4.2,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-piano-focus"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "14YiPc411VtUGFgfKm7mra",
      externalLink: "https://open.spotify.com/track/14YiPc411VtUGFgfKm7mra",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Time",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "time|0jW6R8CVyVohuUJVcuweDI|252000",
  song: "song/the-piano-guys-time",
} as const satisfies Track
