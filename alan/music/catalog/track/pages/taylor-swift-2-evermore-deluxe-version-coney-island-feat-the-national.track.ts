import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2EvermoreDeluxeVersionConeyIslandFeatTheNational = {
  id: "01a0ce86-5f9f-7f2e-b940-4eee9d9eeafc",
  type: "page-type/track",
  slug: "taylor-swift-2-evermore-deluxe-version-coney-island-feat-the-national",
  ownLength: 4.588666666666667,
  ownProgress: 4.588666666666667,
  partOfCollections: [
    "release/taylor-swift-2-evermore-deluxe-version",
    "release/taylor-swift-2-evermore",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "coney island (feat. The National)",
  trackType: "studio",
  explicit: false,
  trackArtist: [
    { externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" },
    { externalId: "2cCUtGK9sDU2EoElnk0GNB", artistName: "The National" },
  ],
  trackKey: "coneyislandfeatthenational|06HL4z0CvFAxyc27GXpf02,2cCUtGK9sDU2EoElnk0GNB|275320",
  song: "song/taylor-swift-coney-island",
  carriedBy: [
    {
      release: "release/taylor-swift-2-evermore",
      discNumber: 1,
      position: 9,
      externalId: "3k7ne7VmH43ZPWxPdvPUgR",
      externalLink: "https://open.spotify.com/track/3k7ne7VmH43ZPWxPdvPUgR",
    },
    {
      release: "release/taylor-swift-2-evermore-deluxe-version",
      discNumber: 1,
      position: 9,
      externalId: "2awNGIJHodfLZSClB3PYhz",
      externalLink: "https://open.spotify.com/track/2awNGIJHodfLZSClB3PYhz",
    },
  ],
} as const satisfies Track
