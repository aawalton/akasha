import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2ThatSWhyIMHereGoingAroundOneMoreTime = {
  id: "01a0abeb-4230-7bd9-9a1c-eb5ba6cb249d",
  type: "page-type/track",
  slug: "james-taylor-2-that-s-why-i-m-here-going-around-one-more-time",
  ownLength: 3.3828833333333335,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-that-s-why-i-m-here"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4gIdlxBwb0oXlsBCqjQYVR",
      externalLink: "https://open.spotify.com/track/4gIdlxBwb0oXlsBCqjQYVR",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Going Around One More Time",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "goingaroundonemoretime|0vn7UBvSQECKJm2817Yf1P|202973",
  song: "song/james-taylor-going-around-one-more-time",
} as const satisfies Track
