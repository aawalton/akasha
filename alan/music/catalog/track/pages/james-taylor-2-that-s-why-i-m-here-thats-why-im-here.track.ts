import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2ThatSWhyIMHereThatsWhyImHere = {
  id: "01a0abeb-41c2-7a91-b9d4-78a3e082790d",
  type: "page-type/track",
  slug: "james-taylor-2-that-s-why-i-m-here-thats-why-im-here",
  ownLength: 3.6237666666666666,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-that-s-why-i-m-here"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1MyJzIJS8xpHgO9wYKcj86",
      externalLink: "https://open.spotify.com/track/1MyJzIJS8xpHgO9wYKcj86",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "That's Why I'm Here",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "thatswhyimhere|0vn7UBvSQECKJm2817Yf1P|217426",
  song: "song/james-taylor-thats-why-im-here",
} as const satisfies Track
