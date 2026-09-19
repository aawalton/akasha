import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3PopOnPianoBeginAgain = {
  id: "01a0afa1-cf0e-7246-b0f9-39ef6228fafb",
  type: "page-type/track",
  slug: "the-piano-guys-3-pop-on-piano-begin-again",
  ownLength: 4.0917666666666666,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-pop-on-piano"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3M6uWdYTUPOh5bXqdgCKL7",
      externalLink: "https://open.spotify.com/track/3M6uWdYTUPOh5bXqdgCKL7",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Begin Again",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "beginagain|0jW6R8CVyVohuUJVcuweDI|245506",
  song: "song/taylor-swift-begin-again",
} as const satisfies Track
