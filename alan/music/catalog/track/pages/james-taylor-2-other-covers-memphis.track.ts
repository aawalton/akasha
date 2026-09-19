import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2OtherCoversMemphis = {
  id: "01a0abeb-3325-7cc4-8cc1-7e0567c7a60b",
  type: "page-type/track",
  slug: "james-taylor-2-other-covers-memphis",
  ownLength: 3.1788833333333333,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-other-covers"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4bRejQ7pYFZ4v1qAggqiA2",
      externalLink: "https://open.spotify.com/track/4bRejQ7pYFZ4v1qAggqiA2",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Memphis",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "memphis|0vn7UBvSQECKJm2817Yf1P|190733",
  song: "song/james-taylor-memphis",
} as const satisfies Track
