import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2SpeakNowHaunted = {
  id: "01a0ce86-8b37-7625-ac58-d126996f90dd",
  type: "page-type/track",
  slug: "taylor-swift-2-speak-now-haunted",
  ownLength: 4.034666666666666,
  ownProgress: 4.034666666666666,
  partOfCollections: [
    "release/taylor-swift-2-speak-now",
    "release/taylor-swift-2-speak-now-deluxe-edition",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Haunted",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "haunted|06HL4z0CvFAxyc27GXpf02|242080",
  song: "song/taylor-swift-haunted",
  carriedBy: [
    {
      release: "release/taylor-swift-2-speak-now",
      discNumber: 1,
      position: 12,
      externalId: "28M2gifMU282QBM3fKajIS",
      externalLink: "https://open.spotify.com/track/28M2gifMU282QBM3fKajIS",
    },
    {
      release: "release/taylor-swift-2-speak-now-deluxe-edition",
      discNumber: 1,
      position: 12,
      externalId: "11UaQaEp2LvdspTyyuE3ur",
      externalLink: "https://open.spotify.com/track/11UaQaEp2LvdspTyyuE3ur",
    },
  ],
} as const satisfies Track
