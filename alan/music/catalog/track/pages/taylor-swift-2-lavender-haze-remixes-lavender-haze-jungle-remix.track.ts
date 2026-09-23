import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2LavenderHazeRemixesLavenderHazeJungleRemix = {
  id: "01a0ce86-9bf8-73a0-9e9b-6d2b9e421113",
  type: "page-type/track",
  slug: "taylor-swift-2-lavender-haze-remixes-lavender-haze-jungle-remix",
  ownLength: 3.9322,
  ownProgress: 0,
  partOfCollections: ["release/taylor-swift-2-lavender-haze-remixes"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Lavender Haze - Jungle Remix",
  trackType: "remix",
  explicit: true,
  trackArtist: [
    { externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" },
    { externalId: "59oA5WbbQvomJz2BuRG071", artistName: "Jungle" },
  ],
  trackKey: "lavenderhazejungleremix|06HL4z0CvFAxyc27GXpf02,59oA5WbbQvomJz2BuRG071|235932",
  song: "song/taylor-swift-lavender-haze",
  carriedBy: [
    {
      release: "release/taylor-swift-2-lavender-haze-remixes",
      discNumber: 1,
      position: 3,
      externalId: "0ThxqUZ9PwS6n0UT5i1XH6",
      externalLink: "https://open.spotify.com/track/0ThxqUZ9PwS6n0UT5i1XH6",
    },
  ],
} as const satisfies Track
