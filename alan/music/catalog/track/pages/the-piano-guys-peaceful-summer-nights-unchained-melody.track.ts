import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysPeacefulSummerNightsUnchainedMelody = {
  id: "01a0afa1-c7d1-79de-8ebc-583e51d26537",
  type: "page-type/track",
  slug: "the-piano-guys-peaceful-summer-nights-unchained-melody",
  ownLength: 3.0182,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-peaceful-summer-nights"],
  position: 14,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5bkVJ2Y1LXqVxT3BWPdT38",
      externalLink: "https://open.spotify.com/track/5bkVJ2Y1LXqVxT3BWPdT38",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Unchained Melody",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "unchainedmelody|0jW6R8CVyVohuUJVcuweDI|181092",
  song: "song/the-piano-guys-unchained-melody",
} as const satisfies Track
