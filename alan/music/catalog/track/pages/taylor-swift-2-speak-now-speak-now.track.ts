import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2SpeakNowSpeakNow = {
  id: "01a0ce86-89ea-7e7f-be73-96e40ec9ce73",
  type: "page-type/track",
  slug: "taylor-swift-2-speak-now-speak-now",
  ownLength: 4.012666666666667,
  ownProgress: 4.012666666666667,
  partOfCollections: [
    "release/taylor-swift-2-speak-now",
    "release/taylor-swift-2-speak-now-deluxe-edition",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Speak Now",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/taylor-swift" }],
  trackKey: "speaknow|06HL4z0CvFAxyc27GXpf02|240760",
  song: "song/taylor-swift-speak-now",
  carriedBy: [
    {
      release: "release/taylor-swift-2-speak-now",
      discNumber: 1,
      position: 4,
      externalId: "24DefNCFiWTP8OjYWiXuYe",
      externalLink: "https://open.spotify.com/track/24DefNCFiWTP8OjYWiXuYe",
    },
    {
      release: "release/taylor-swift-2-speak-now-deluxe-edition",
      discNumber: 1,
      position: 4,
      externalId: "1nYWTzy5zu3zEPNgB1sItW",
      externalLink: "https://open.spotify.com/track/1nYWTzy5zu3zEPNgB1sItW",
    },
  ],
} as const satisfies Track
