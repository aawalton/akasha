import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2TheManLiveFromParisTheManLiveFromParis = {
  id: "01a0ce86-a6d1-722c-b570-db409720299a",
  type: "page-type/track",
  slug: "taylor-swift-2-the-man-live-from-paris-the-man-live-from-paris",
  ownLength: 3.656416666666667,
  ownProgress: 3.656416666666667,
  partOfCollections: ["release/taylor-swift-2-the-man-live-from-paris"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Man - Live From Paris",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/taylor-swift" }],
  trackKey: "themanlivefromparis|06HL4z0CvFAxyc27GXpf02|219385",
  song: "song/taylor-swift-the-man",
  carriedBy: [
    {
      release: "release/taylor-swift-2-the-man-live-from-paris",
      discNumber: 1,
      position: 1,
      externalId: "7FKbTRXXIWVFQmPH8zGfU0",
      externalLink: "https://open.spotify.com/track/7FKbTRXXIWVFQmPH8zGfU0",
    },
  ],
} as const satisfies Track
