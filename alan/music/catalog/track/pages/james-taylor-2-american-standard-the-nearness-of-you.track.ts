import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2AmericanStandardTheNearnessOfYou = {
  id: "01a0abeb-2ece-7da7-806d-d0ef1535a296",
  type: "page-type/track",
  slug: "james-taylor-2-american-standard-the-nearness-of-you",
  ownLength: 3.8724333333333334,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-american-standard"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2bIzGu5WuGhhH1d5hU5Rmh",
      externalLink: "https://open.spotify.com/track/2bIzGu5WuGhhH1d5hU5Rmh",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "The Nearness Of You",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "thenearnessofyou|0vn7UBvSQECKJm2817Yf1P|232346",
} as const satisfies Track
