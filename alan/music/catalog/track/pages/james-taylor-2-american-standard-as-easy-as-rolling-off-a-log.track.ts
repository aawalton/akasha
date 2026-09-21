import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2AmericanStandardAsEasyAsRollingOffALog = {
  id: "01a0abeb-2e69-7015-a374-d3965e774132",
  type: "page-type/track",
  slug: "james-taylor-2-american-standard-as-easy-as-rolling-off-a-log",
  ownLength: 2.8404333333333334,
  ownProgress: 2.8404333333333334,
  partOfCollections: ["release/james-taylor-2-american-standard"],
  position: 4,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1pGCEor5tqU6Jk783Gs39L",
      externalLink: "https://open.spotify.com/track/1pGCEor5tqU6Jk783Gs39L",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "As Easy As Rolling Off A Log",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "aseasyasrollingoffalog|0vn7UBvSQECKJm2817Yf1P|170426",
  song: "song/james-taylor-as-easy-as-rolling-off-a-log",
  carriedBy: [
    {
      release: "release/james-taylor-2-american-standard",
      discNumber: 1,
      position: 4,
      externalId: "1pGCEor5tqU6Jk783Gs39L",
      externalLink: "https://open.spotify.com/track/1pGCEor5tqU6Jk783Gs39L",
    },
  ],
} as const satisfies Track
