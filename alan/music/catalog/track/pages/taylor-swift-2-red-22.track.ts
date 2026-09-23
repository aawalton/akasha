import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2Red22 = {
  id: "01a0ce86-8499-7006-960c-6a2d75b2836a",
  type: "page-type/track",
  slug: "taylor-swift-2-red-22",
  ownLength: 3.83555,
  ownProgress: 3.83555,
  partOfCollections: ["release/taylor-swift-2-red", "release/taylor-swift-2-red-deluxe-edition"],
  status: "completed",
  unit: "unit/minutes",
  title: "22",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "22|06HL4z0CvFAxyc27GXpf02|230133",
  song: "song/taylor-swift-22",
  carriedBy: [
    {
      release: "release/taylor-swift-2-red",
      discNumber: 1,
      position: 6,
      externalId: "2ULNeSomDxVNmdDy8VxEBU",
      externalLink: "https://open.spotify.com/track/2ULNeSomDxVNmdDy8VxEBU",
    },
    {
      release: "release/taylor-swift-2-red-deluxe-edition",
      discNumber: 1,
      position: 6,
      externalId: "3bIxTsfeNMO7Nt2J3EUKrA",
      externalLink: "https://open.spotify.com/track/3bIxTsfeNMO7Nt2J3EUKrA",
    },
  ],
} as const satisfies Track
