import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysPeacefulSummerNightsEyeOfTheTiger = {
  id: "01a0afa1-c68f-7379-99a4-649762f1cce7",
  type: "page-type/track",
  slug: "the-piano-guys-peaceful-summer-nights-eye-of-the-tiger",
  ownLength: 4.046083333333334,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-peaceful-summer-nights"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "40M4aJzMQn1wrXdunUBpMB",
      externalLink: "https://open.spotify.com/track/40M4aJzMQn1wrXdunUBpMB",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Eye of the Tiger",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "eyeofthetiger|0jW6R8CVyVohuUJVcuweDI|242765",
} as const satisfies Track
