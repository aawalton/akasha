import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysPeacefulSummerNightsAllGood = {
  id: "01a0afa1-c6dc-7c8f-8684-5b3bf7a65ab8",
  type: "page-type/track",
  slug: "the-piano-guys-peaceful-summer-nights-all-good",
  ownLength: 2.3907166666666666,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-peaceful-summer-nights"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1ejr8Z1mj6Wiiyx1dy42WB",
      externalLink: "https://open.spotify.com/track/1ejr8Z1mj6Wiiyx1dy42WB",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "All Good",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "allgood|0jW6R8CVyVohuUJVcuweDI|143443",
  song: "song/the-piano-guys-all-good",
} as const satisfies Track
