import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2TheArcherLiveFromParisTheArcherLiveFromParis = {
  id: "01a0ce86-a681-7d47-913f-0d82ccb444a5",
  type: "page-type/track",
  slug: "taylor-swift-2-the-archer-live-from-paris-the-archer-live-from-paris",
  ownLength: 3.516,
  ownProgress: 3.516,
  partOfCollections: ["release/taylor-swift-2-the-archer-live-from-paris"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Archer - Live From Paris",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/taylor-swift" }],
  trackKey: "thearcherlivefromparis|06HL4z0CvFAxyc27GXpf02|210960",
  song: "song/taylor-swift-the-archer",
  carriedBy: [
    {
      release: "release/taylor-swift-2-the-archer-live-from-paris",
      discNumber: 1,
      position: 1,
      externalId: "2fgiBCtbWo8pijF6M7pN1i",
      externalLink: "https://open.spotify.com/track/2fgiBCtbWo8pijF6M7pN1i",
    },
  ],
} as const satisfies Track
