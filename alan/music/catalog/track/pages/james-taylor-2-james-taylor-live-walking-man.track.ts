import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JamesTaylorLiveWalkingMan = {
  id: "01a0abeb-3d84-7573-8d3b-79af900f19ce",
  type: "page-type/track",
  slug: "james-taylor-2-james-taylor-live-walking-man",
  ownLength: 4.5911,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-james-taylor-live"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0nL5J9kKl9aniVySzW0MmD",
      externalLink: "https://open.spotify.com/track/0nL5J9kKl9aniVySzW0MmD",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Walking Man",
  discNumber: 2,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "walkingman|0vn7UBvSQECKJm2817Yf1P|275466",
} as const satisfies Track
