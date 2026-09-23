import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2FearlessForeverAlways = {
  id: "01a0ce86-90a0-7ad0-aec7-f303dd7a7e3e",
  type: "page-type/track",
  slug: "taylor-swift-2-fearless-forever-always",
  ownLength: 3.755333333333333,
  ownProgress: 0,
  partOfCollections: ["release/taylor-swift-2-fearless"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Forever & Always",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "foreveralways|06HL4z0CvFAxyc27GXpf02|225320",
  song: "song/taylor-swift-forever-always",
  carriedBy: [
    {
      release: "release/taylor-swift-2-fearless",
      discNumber: 1,
      position: 11,
      externalId: "47HtKpfzpAt8rQjjXWotFj",
      externalLink: "https://open.spotify.com/track/47HtKpfzpAt8rQjjXWotFj",
    },
  ],
} as const satisfies Track
