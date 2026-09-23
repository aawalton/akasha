import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2LavenderHazeRemixesLavenderHazeFelixJaehnRemix = {
  id: "01a0ce86-9c71-7080-95e4-0371cd029d80",
  type: "page-type/track",
  slug: "taylor-swift-2-lavender-haze-remixes-lavender-haze-felix-jaehn-remix",
  ownLength: 2.859366666666667,
  ownProgress: 2.859366666666667,
  partOfCollections: [
    "release/taylor-swift-2-lavender-haze-remixes",
    "release/taylor-swift-2-lavender-haze-felix-jaehn-remix",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Lavender Haze - Felix Jaehn Remix",
  trackType: "remix",
  explicit: true,
  trackArtist: [
    { externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" },
    { externalId: "4bL2B6hmLlMWnUEZnorEtG", artistName: "felix jaehn" },
  ],
  trackKey: "lavenderhazefelixjaehnremix|06HL4z0CvFAxyc27GXpf02,4bL2B6hmLlMWnUEZnorEtG|171562",
  song: "song/taylor-swift-lavender-haze",
  carriedBy: [
    {
      release: "release/taylor-swift-2-lavender-haze-felix-jaehn-remix",
      discNumber: 1,
      position: 1,
      externalId: "2M4tVhRXucLE9M3STv21Yi",
      externalLink: "https://open.spotify.com/track/2M4tVhRXucLE9M3STv21Yi",
    },
    {
      release: "release/taylor-swift-2-lavender-haze-remixes",
      discNumber: 1,
      position: 4,
      externalId: "5KxZfCXXmVvKhPo8hQz2pS",
      externalLink: "https://open.spotify.com/track/5KxZfCXXmVvKhPo8hQz2pS",
    },
  ],
} as const satisfies Track
