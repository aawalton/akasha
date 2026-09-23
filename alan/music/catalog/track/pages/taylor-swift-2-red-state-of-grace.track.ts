import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2RedStateOfGrace = {
  id: "01a0ce86-83cf-7078-af96-b3a44dccd3c5",
  type: "page-type/track",
  slug: "taylor-swift-2-red-state-of-grace",
  ownLength: 4.919766666666667,
  ownProgress: 4.919766666666667,
  partOfCollections: ["release/taylor-swift-2-red", "release/taylor-swift-2-red-deluxe-edition"],
  status: "completed",
  unit: "unit/minutes",
  title: "State Of Grace",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "stateofgrace|06HL4z0CvFAxyc27GXpf02|295186",
  song: "song/taylor-swift-state-of-grace",
  carriedBy: [
    {
      release: "release/taylor-swift-2-red",
      discNumber: 1,
      position: 1,
      externalId: "786NsUYn4GGUf8AOt0SQhP",
      externalLink: "https://open.spotify.com/track/786NsUYn4GGUf8AOt0SQhP",
    },
    {
      release: "release/taylor-swift-2-red-deluxe-edition",
      discNumber: 1,
      position: 1,
      externalId: "5zyCYmiaVE5y26EZuwZbsw",
      externalLink: "https://open.spotify.com/track/5zyCYmiaVE5y26EZuwZbsw",
    },
  ],
} as const satisfies Track
