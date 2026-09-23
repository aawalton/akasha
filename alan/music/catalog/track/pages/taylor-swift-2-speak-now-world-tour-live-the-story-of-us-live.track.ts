import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2SpeakNowWorldTourLiveTheStoryOfUsLive = {
  id: "01a0ce86-8ce1-74f8-b1a9-b135ef2a7e32",
  type: "page-type/track",
  slug: "taylor-swift-2-speak-now-world-tour-live-the-story-of-us-live",
  ownLength: 4.842,
  ownProgress: 4.842,
  partOfCollections: ["release/taylor-swift-2-speak-now-world-tour-live"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Story Of Us - Live",
  trackType: "live",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "thestoryofuslive|06HL4z0CvFAxyc27GXpf02|290520",
  song: "song/taylor-swift-the-story-of-us",
  carriedBy: [
    {
      release: "release/taylor-swift-2-speak-now-world-tour-live",
      discNumber: 1,
      position: 3,
      externalId: "72GIZuUXo14oyrS0si3Rgc",
      externalLink: "https://open.spotify.com/track/72GIZuUXo14oyrS0si3Rgc",
    },
  ],
} as const satisfies Track
