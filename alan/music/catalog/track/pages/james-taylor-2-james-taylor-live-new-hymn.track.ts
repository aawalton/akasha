import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JamesTaylorLiveNewHymn = {
  id: "01a0abeb-3d63-765a-952a-4d90cb9bde17",
  type: "page-type/track",
  slug: "james-taylor-2-james-taylor-live-new-hymn",
  ownLength: 3.0137666666666667,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-james-taylor-live"],
  position: 15,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4mspGeMQumiTR3u46ySXRf",
      externalLink: "https://open.spotify.com/track/4mspGeMQumiTR3u46ySXRf",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "New Hymn",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "newhymn|0vn7UBvSQECKJm2817Yf1P|180826",
  song: "song/james-taylor-new-hymn",
} as const satisfies Track
