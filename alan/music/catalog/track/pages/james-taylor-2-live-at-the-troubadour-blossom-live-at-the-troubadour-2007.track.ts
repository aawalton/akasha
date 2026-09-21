import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2LiveAtTheTroubadourBlossomLiveAtTheTroubadour2007 = {
  id: "01a0abeb-310f-7ff7-9645-68717335bea6",
  type: "page-type/track",
  slug: "james-taylor-2-live-at-the-troubadour-blossom-live-at-the-troubadour-2007",
  ownLength: 3.1628833333333333,
  ownProgress: 3.1628833333333333,
  partOfCollections: ["release/james-taylor-2-live-at-the-troubadour"],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0TtyTyOnVLJnpAWwg9o1PY",
      externalLink: "https://open.spotify.com/track/0TtyTyOnVLJnpAWwg9o1PY",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Blossom - Live At The Troubadour / 2007",
  trackType: "live",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "319yZVtYM9MBGqmSQnMyY6", artistName: "Carole King" },
    { externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" },
  ],
  trackKey: "blossomliveatthetroubadour2007|0vn7UBvSQECKJm2817Yf1P,319yZVtYM9MBGqmSQnMyY6|189773",
  song: "song/james-taylor-blossom",
  carriedBy: [
    {
      release: "release/james-taylor-2-live-at-the-troubadour",
      discNumber: 1,
      position: 1,
      externalId: "0TtyTyOnVLJnpAWwg9o1PY",
      externalLink: "https://open.spotify.com/track/0TtyTyOnVLJnpAWwg9o1PY",
    },
  ],
} as const satisfies Track
