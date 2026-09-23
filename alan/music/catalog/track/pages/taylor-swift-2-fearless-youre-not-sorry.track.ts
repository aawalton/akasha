import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2FearlessYoureNotSorry = {
  id: "01a0ce86-904e-734e-a017-6be27d01555b",
  type: "page-type/track",
  slug: "taylor-swift-2-fearless-youre-not-sorry",
  ownLength: 4.3631,
  ownProgress: 4.3631,
  partOfCollections: ["release/taylor-swift-2-fearless"],
  status: "completed",
  unit: "unit/minutes",
  title: "You're Not Sorry",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "yourenotsorry|06HL4z0CvFAxyc27GXpf02|261786",
  song: "song/taylor-swift-you-re-not-sorry",
  carriedBy: [
    {
      release: "release/taylor-swift-2-fearless",
      discNumber: 1,
      position: 9,
      externalId: "0HmCuN0Z3OX1Qrz43FLOPL",
      externalLink: "https://open.spotify.com/track/0HmCuN0Z3OX1Qrz43FLOPL",
    },
  ],
} as const satisfies Track
