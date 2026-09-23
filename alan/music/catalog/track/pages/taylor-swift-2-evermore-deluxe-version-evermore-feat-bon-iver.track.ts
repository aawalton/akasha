import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2EvermoreDeluxeVersionEvermoreFeatBonIver = {
  id: "01a0ce86-608f-7778-a9c1-32ba49ca14eb",
  type: "page-type/track",
  slug: "taylor-swift-2-evermore-deluxe-version-evermore-feat-bon-iver",
  ownLength: 5.068433333333333,
  ownProgress: 0,
  partOfCollections: [
    "release/taylor-swift-2-evermore-deluxe-version",
    "release/taylor-swift-2-evermore",
  ],
  status: "not-started",
  unit: "unit/minutes",
  title: "evermore (feat. Bon Iver)",
  trackType: "studio",
  explicit: false,
  trackArtist: [
    { externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" },
    { externalId: "4LEiUm1SRbFMgfqnQTwUbQ", artistName: "Bon Iver" },
  ],
  trackKey: "evermorefeatboniver|06HL4z0CvFAxyc27GXpf02,4LEiUm1SRbFMgfqnQTwUbQ|304106",
  song: "song/taylor-swift-evermore",
  carriedBy: [
    {
      release: "release/taylor-swift-2-evermore",
      discNumber: 1,
      position: 15,
      externalId: "3O5osWf1rSoKMwe6E9ZaXP",
      externalLink: "https://open.spotify.com/track/3O5osWf1rSoKMwe6E9ZaXP",
    },
    {
      release: "release/taylor-swift-2-evermore-deluxe-version",
      discNumber: 1,
      position: 15,
      externalId: "6Wlq9rqkxrqj5Kls4Kw14H",
      externalLink: "https://open.spotify.com/track/6Wlq9rqkxrqj5Kls4Kw14H",
    },
  ],
} as const satisfies Track
