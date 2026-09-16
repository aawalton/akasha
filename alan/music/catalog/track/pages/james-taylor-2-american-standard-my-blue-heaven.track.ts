import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2AmericanStandardMyBlueHeaven = {
  id: "01a0abeb-2e15-76bf-bbfb-b98877a83d03",
  type: "page-type/track",
  slug: "james-taylor-2-american-standard-my-blue-heaven",
  ownLength: 2.719333333333333,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-american-standard"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0DTzNcTTUZRFhJqMcBh34s",
      externalLink: "https://open.spotify.com/track/0DTzNcTTUZRFhJqMcBh34s",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "My Blue Heaven",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "myblueheaven|0vn7UBvSQECKJm2817Yf1P|163160",
} as const satisfies Track
