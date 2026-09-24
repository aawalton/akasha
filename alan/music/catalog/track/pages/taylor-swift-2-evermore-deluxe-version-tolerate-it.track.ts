import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2EvermoreDeluxeVersionTolerateIt = {
  id: "01a0ce86-5efa-7bd4-928f-0619a03d453f",
  type: "page-type/track",
  slug: "taylor-swift-2-evermore-deluxe-version-tolerate-it",
  ownLength: 4.0906666666666665,
  ownProgress: 4.0906666666666665,
  partOfCollections: [
    "release/taylor-swift-2-evermore-deluxe-version",
    "release/taylor-swift-2-evermore",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "tolerate it",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/taylor-swift" }],
  trackKey: "tolerateit|06HL4z0CvFAxyc27GXpf02|245440",
  song: "song/taylor-swift-tolerate-it",
  carriedBy: [
    {
      release: "release/taylor-swift-2-evermore",
      discNumber: 1,
      position: 5,
      externalId: "0PurA4JVJ8YQgSVopY8fn6",
      externalLink: "https://open.spotify.com/track/0PurA4JVJ8YQgSVopY8fn6",
    },
    {
      release: "release/taylor-swift-2-evermore-deluxe-version",
      discNumber: 1,
      position: 5,
      externalId: "6lCvK2AR2uOKkVFCVlAzzm",
      externalLink: "https://open.spotify.com/track/6lCvK2AR2uOKkVFCVlAzzm",
    },
  ],
} as const satisfies Track
