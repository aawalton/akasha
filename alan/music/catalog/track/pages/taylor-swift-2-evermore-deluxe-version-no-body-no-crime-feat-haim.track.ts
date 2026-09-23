import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2EvermoreDeluxeVersionNoBodyNoCrimeFeatHaim = {
  id: "01a0ce86-5f24-7fe6-9f37-9cc2141d16e2",
  type: "page-type/track",
  slug: "taylor-swift-2-evermore-deluxe-version-no-body-no-crime-feat-haim",
  ownLength: 3.5937666666666668,
  ownProgress: 0,
  partOfCollections: [
    "release/taylor-swift-2-evermore-deluxe-version",
    "release/taylor-swift-2-evermore",
  ],
  status: "not-started",
  unit: "unit/minutes",
  title: "no body, no crime (feat. HAIM)",
  trackType: "studio",
  explicit: false,
  trackArtist: [
    { externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" },
    { externalId: "4Ui2kfOqGujY81UcPrb5KE", artistName: "HAIM" },
  ],
  trackKey: "nobodynocrimefeathaim|06HL4z0CvFAxyc27GXpf02,4Ui2kfOqGujY81UcPrb5KE|215626",
  song: "song/taylor-swift-no-body-no-crime",
  carriedBy: [
    {
      release: "release/taylor-swift-2-evermore",
      discNumber: 1,
      position: 6,
      externalId: "3RaT22zZsxVYxxKR7TAaYF",
      externalLink: "https://open.spotify.com/track/3RaT22zZsxVYxxKR7TAaYF",
    },
    {
      release: "release/taylor-swift-2-evermore-deluxe-version",
      discNumber: 1,
      position: 6,
      externalId: "6uwfVkaOM1mcMkFmSn35ix",
      externalLink: "https://open.spotify.com/track/6uwfVkaOM1mcMkFmSn35ix",
    },
  ],
} as const satisfies Track
