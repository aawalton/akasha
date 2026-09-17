import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysPeacefulSummerNightsLoveMeLikeIAm = {
  id: "01a0afa1-c749-7980-aaa2-e494d3486abf",
  type: "page-type/track",
  slug: "the-piano-guys-peaceful-summer-nights-love-me-like-i-am",
  ownLength: 4.5694333333333335,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-peaceful-summer-nights"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6yhy51gaREwlmZArx20Sxs",
      externalLink: "https://open.spotify.com/track/6yhy51gaREwlmZArx20Sxs",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Love Me Like I Am",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "lovemelikeiam|0jW6R8CVyVohuUJVcuweDI|274166",
} as const satisfies Track
