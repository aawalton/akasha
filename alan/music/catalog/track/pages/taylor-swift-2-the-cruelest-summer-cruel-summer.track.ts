import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2TheCruelestSummerCruelSummer = {
  id: "01a0ce86-9b59-746a-97f9-fd759ae22ab4",
  type: "page-type/track",
  slug: "taylor-swift-2-the-cruelest-summer-cruel-summer",
  ownLength: 2.97375,
  ownProgress: 2.97375,
  partOfCollections: ["release/taylor-swift-2-the-cruelest-summer"],
  status: "completed",
  unit: "unit/minutes",
  title: "Cruel Summer",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "cruelsummer|06HL4z0CvFAxyc27GXpf02|178425",
  song: "song/taylor-swift-cruel-summer",
  carriedBy: [
    {
      release: "release/taylor-swift-2-the-cruelest-summer",
      discNumber: 1,
      position: 4,
      externalId: "1kHVme7OVyPqhtdiLj2SI4",
      externalLink: "https://open.spotify.com/track/1kHVme7OVyPqhtdiLj2SI4",
    },
  ],
} as const satisfies Track
