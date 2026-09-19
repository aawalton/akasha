import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2BeforeThisWorldWildMountainThyme = {
  id: "01a0abeb-30f1-7ac2-bb4d-8bc30acca85c",
  type: "page-type/track",
  slug: "james-taylor-2-before-this-world-wild-mountain-thyme",
  ownLength: 2.9486666666666665,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-before-this-world"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "16WXV9PnrHQQInXfVmbJhI",
      externalLink: "https://open.spotify.com/track/16WXV9PnrHQQInXfVmbJhI",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Wild Mountain Thyme",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "wildmountainthyme|0vn7UBvSQECKJm2817Yf1P|176920",
  song: "song/james-taylor-wild-mountain-thyme",
} as const satisfies Track
