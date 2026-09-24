import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2RedHolyGround = {
  id: "01a0ce86-855f-77e7-8b0d-2efeebb3dc48",
  type: "page-type/track",
  slug: "taylor-swift-2-red-holy-ground",
  ownLength: 3.3642166666666666,
  ownProgress: 3.3642166666666666,
  partOfCollections: ["release/taylor-swift-2-red", "release/taylor-swift-2-red-deluxe-edition"],
  status: "completed",
  unit: "unit/minutes",
  title: "Holy Ground",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/taylor-swift" }],
  trackKey: "holyground|06HL4z0CvFAxyc27GXpf02|201853",
  song: "song/taylor-swift-holy-ground",
  carriedBy: [
    {
      release: "release/taylor-swift-2-red",
      discNumber: 1,
      position: 11,
      externalId: "1fGsZsIkQkOspfsT24nQP6",
      externalLink: "https://open.spotify.com/track/1fGsZsIkQkOspfsT24nQP6",
    },
    {
      release: "release/taylor-swift-2-red-deluxe-edition",
      discNumber: 1,
      position: 11,
      externalId: "5d2Kn9oAAh9S2EbyCo1i52",
      externalLink: "https://open.spotify.com/track/5d2Kn9oAAh9S2EbyCo1i52",
    },
  ],
} as const satisfies Track
