import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JtHoneyDontLeaveLA = {
  id: "01a0abeb-4619-7301-9e8b-691b1ec9915b",
  type: "page-type/track",
  slug: "james-taylor-2-jt-honey-dont-leave-l-a",
  ownLength: 3.1063833333333335,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-jt"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4JYMyddoksmabha0ZCltwA",
      externalLink: "https://open.spotify.com/track/4JYMyddoksmabha0ZCltwA",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Honey Don't Leave L.A.",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "honeydontleavela|0vn7UBvSQECKJm2817Yf1P|186383",
  song: "song/james-taylor-honey-dont-leave-l-a",
} as const satisfies Track
