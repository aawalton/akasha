import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2BadBloodBadBlood = {
  id: "01a0ce86-a96c-71c3-a2d3-f4068726d2bd",
  type: "page-type/track",
  slug: "taylor-swift-2-bad-blood-bad-blood",
  ownLength: 3.3351,
  ownProgress: 3.3351,
  partOfCollections: ["release/taylor-swift-2-bad-blood"],
  status: "completed",
  unit: "unit/minutes",
  title: "Bad Blood",
  trackType: "studio",
  explicit: false,
  trackArtist: [
    { externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" },
    { externalId: "2YZyLoL8N0Wb9xBt1NhZWg", artistName: "Kendrick Lamar" },
  ],
  trackKey: "badblood|06HL4z0CvFAxyc27GXpf02,2YZyLoL8N0Wb9xBt1NhZWg|200106",
  song: "song/taylor-swift-bad-blood",
  carriedBy: [
    {
      release: "release/taylor-swift-2-bad-blood",
      discNumber: 1,
      position: 1,
      externalId: "6xsEAm6w9oMQYYg3jkEkMT",
      externalLink: "https://open.spotify.com/track/6xsEAm6w9oMQYYg3jkEkMT",
    },
  ],
} as const satisfies Track
