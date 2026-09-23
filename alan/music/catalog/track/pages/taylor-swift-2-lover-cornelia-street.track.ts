import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2LoverCorneliaStreet = {
  id: "01a0ce86-6f1d-7a0b-8e32-8e9a56d4cdad",
  type: "page-type/track",
  slug: "taylor-swift-2-lover-cornelia-street",
  ownLength: 4.787766666666666,
  ownProgress: 0,
  partOfCollections: ["release/taylor-swift-2-lover"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Cornelia Street",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "corneliastreet|06HL4z0CvFAxyc27GXpf02|287266",
  song: "song/taylor-swift-cornelia-street",
  carriedBy: [
    {
      release: "release/taylor-swift-2-lover",
      discNumber: 1,
      position: 9,
      externalId: "12M5uqx0ZuwkpLp5rJim1a",
      externalLink: "https://open.spotify.com/track/12M5uqx0ZuwkpLp5rJim1a",
    },
  ],
} as const satisfies Track
