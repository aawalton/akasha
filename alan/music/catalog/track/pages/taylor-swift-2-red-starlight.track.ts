import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2RedStarlight = {
  id: "01a0ce86-8600-7c1d-851a-284d2efa7736",
  type: "page-type/track",
  slug: "taylor-swift-2-red-starlight",
  ownLength: 3.6304333333333334,
  ownProgress: 3.6304333333333334,
  partOfCollections: ["release/taylor-swift-2-red", "release/taylor-swift-2-red-deluxe-edition"],
  status: "completed",
  unit: "unit/minutes",
  title: "Starlight",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "starlight|06HL4z0CvFAxyc27GXpf02|217826",
  song: "song/taylor-swift-starlight",
  carriedBy: [
    {
      release: "release/taylor-swift-2-red",
      discNumber: 1,
      position: 15,
      externalId: "7MecVsMj22MneZt7kVFaCr",
      externalLink: "https://open.spotify.com/track/7MecVsMj22MneZt7kVFaCr",
    },
    {
      release: "release/taylor-swift-2-red-deluxe-edition",
      discNumber: 1,
      position: 15,
      externalId: "0vqI4ZIMuifeKeItGiWbPj",
      externalLink: "https://open.spotify.com/track/0vqI4ZIMuifeKeItGiWbPj",
    },
  ],
} as const satisfies Track
