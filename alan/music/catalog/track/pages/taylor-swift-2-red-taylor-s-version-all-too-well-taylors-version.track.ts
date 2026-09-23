import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2RedTaylorSVersionAllTooWellTaylorsVersion = {
  id: "01a0ce86-5278-7b1a-98dc-c4fb5759303c",
  type: "page-type/track",
  slug: "taylor-swift-2-red-taylor-s-version-all-too-well-taylors-version",
  ownLength: 5.486,
  ownProgress: 5.486,
  partOfCollections: ["release/taylor-swift-2-red-taylor-s-version"],
  status: "completed",
  unit: "unit/minutes",
  title: "All Too Well (Taylor's Version)",
  trackType: "version",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "alltoowelltaylorsversion|06HL4z0CvFAxyc27GXpf02|329160",
  song: "song/taylor-swift-all-too-well",
  carriedBy: [
    {
      release: "release/taylor-swift-2-red-taylor-s-version",
      discNumber: 1,
      position: 5,
      externalId: "3nsfB1vus2qaloUdcBZvDu",
      externalLink: "https://open.spotify.com/track/3nsfB1vus2qaloUdcBZvDu",
    },
  ],
} as const satisfies Track
