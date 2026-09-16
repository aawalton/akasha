import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2NeverDieYoungNeverDieYoung = {
  id: "01a0abeb-4095-7a1a-bd48-998011621714",
  type: "page-type/track",
  slug: "james-taylor-2-never-die-young-never-die-young",
  ownLength: 4.4,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-never-die-young"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0ALbTno07vq90jEOFcHCbd",
      externalLink: "https://open.spotify.com/track/0ALbTno07vq90jEOFcHCbd",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Never Die Young",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "neverdieyoung|0vn7UBvSQECKJm2817Yf1P|264000",
} as const satisfies Track
