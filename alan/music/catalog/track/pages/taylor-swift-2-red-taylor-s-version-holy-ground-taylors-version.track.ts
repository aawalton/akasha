import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2RedTaylorSVersionHolyGroundTaylorsVersion = {
  id: "01a0ce86-5364-704d-b99a-b575a5d6be45",
  type: "page-type/track",
  slug: "taylor-swift-2-red-taylor-s-version-holy-ground-taylors-version",
  ownLength: 3.3826666666666667,
  ownProgress: 3.3826666666666667,
  partOfCollections: ["release/taylor-swift-2-red-taylor-s-version"],
  status: "completed",
  unit: "unit/minutes",
  title: "Holy Ground (Taylor's Version)",
  trackType: "version",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "holygroundtaylorsversion|06HL4z0CvFAxyc27GXpf02|202960",
  song: "song/taylor-swift-holy-ground",
  carriedBy: [
    {
      release: "release/taylor-swift-2-red-taylor-s-version",
      discNumber: 1,
      position: 11,
      externalId: "7J4b3LVCIGO4CMBDFLPoP6",
      externalLink: "https://open.spotify.com/track/7J4b3LVCIGO4CMBDFLPoP6",
    },
  ],
} as const satisfies Track
