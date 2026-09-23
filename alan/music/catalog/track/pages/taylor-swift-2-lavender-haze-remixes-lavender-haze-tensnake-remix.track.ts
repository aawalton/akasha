import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2LavenderHazeRemixesLavenderHazeTensnakeRemix = {
  id: "01a0ce86-9ba7-7448-8bfe-1d06cdd8790b",
  type: "page-type/track",
  slug: "taylor-swift-2-lavender-haze-remixes-lavender-haze-tensnake-remix",
  ownLength: 3.5827666666666667,
  ownProgress: 3.5827666666666667,
  partOfCollections: ["release/taylor-swift-2-lavender-haze-remixes"],
  status: "completed",
  unit: "unit/minutes",
  title: "Lavender Haze - Tensnake Remix",
  trackType: "remix",
  explicit: true,
  trackArtist: [
    { externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" },
    { externalId: "75nC6MXUalYZSOd7OfNkwq", artistName: "Tensnake" },
  ],
  trackKey: "lavenderhazetensnakeremix|06HL4z0CvFAxyc27GXpf02,75nC6MXUalYZSOd7OfNkwq|214966",
  song: "song/taylor-swift-lavender-haze",
  carriedBy: [
    {
      release: "release/taylor-swift-2-lavender-haze-remixes",
      discNumber: 1,
      position: 1,
      externalId: "7kjSmkSo15pHlkb0mOQtfj",
      externalLink: "https://open.spotify.com/track/7kjSmkSo15pHlkb0mOQtfj",
    },
  ],
} as const satisfies Track
