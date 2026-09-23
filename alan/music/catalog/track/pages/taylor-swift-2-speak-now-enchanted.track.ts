import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2SpeakNowEnchanted = {
  id: "01a0ce86-8abb-7729-b706-1893fc09d785",
  type: "page-type/track",
  slug: "taylor-swift-2-speak-now-enchanted",
  ownLength: 5.869766666666667,
  ownProgress: 5.869766666666667,
  partOfCollections: [
    "release/taylor-swift-2-speak-now",
    "release/taylor-swift-2-speak-now-deluxe-edition",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Enchanted",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "enchanted|06HL4z0CvFAxyc27GXpf02|352186",
  song: "song/taylor-swift-enchanted",
  carriedBy: [
    {
      release: "release/taylor-swift-2-speak-now",
      discNumber: 1,
      position: 9,
      externalId: "10eBRyImhfqVvkiVEGf0N0",
      externalLink: "https://open.spotify.com/track/10eBRyImhfqVvkiVEGf0N0",
    },
    {
      release: "release/taylor-swift-2-speak-now-deluxe-edition",
      discNumber: 1,
      position: 9,
      externalId: "14LtANuaslKWyYbktUrHBU",
      externalLink: "https://open.spotify.com/track/14LtANuaslKWyYbktUrHBU",
    },
  ],
} as const satisfies Track
