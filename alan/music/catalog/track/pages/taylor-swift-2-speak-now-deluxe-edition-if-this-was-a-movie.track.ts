import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2SpeakNowDeluxeEditionIfThisWasAMovie = {
  id: "01a0ce86-8bd6-7730-80ab-fcadba02e94e",
  type: "page-type/track",
  slug: "taylor-swift-2-speak-now-deluxe-edition-if-this-was-a-movie",
  ownLength: 3.9091,
  ownProgress: 0,
  partOfCollections: ["release/taylor-swift-2-speak-now-deluxe-edition"],
  status: "not-started",
  unit: "unit/minutes",
  title: "If This Was A Movie",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "ifthiswasamovie|06HL4z0CvFAxyc27GXpf02|234546",
  song: "song/taylor-swift-if-this-was-a-movie",
  carriedBy: [
    {
      release: "release/taylor-swift-2-speak-now-deluxe-edition",
      discNumber: 1,
      position: 16,
      externalId: "0vvt4IZOMkRug195S4MUq0",
      externalLink: "https://open.spotify.com/track/0vvt4IZOMkRug195S4MUq0",
    },
  ],
} as const satisfies Track
