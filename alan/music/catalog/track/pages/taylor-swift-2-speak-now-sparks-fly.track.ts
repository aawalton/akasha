import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2SpeakNowSparksFly = {
  id: "01a0ce86-8995-71f4-8a57-dc24f503223a",
  type: "page-type/track",
  slug: "taylor-swift-2-speak-now-sparks-fly",
  ownLength: 4.348883333333333,
  ownProgress: 0,
  partOfCollections: [
    "release/taylor-swift-2-speak-now",
    "release/taylor-swift-2-speak-now-deluxe-edition",
  ],
  status: "not-started",
  unit: "unit/minutes",
  title: "Sparks Fly",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "sparksfly|06HL4z0CvFAxyc27GXpf02|260933",
  song: "song/taylor-swift-sparks-fly",
  carriedBy: [
    {
      release: "release/taylor-swift-2-speak-now",
      discNumber: 1,
      position: 2,
      externalId: "6d9IiDcFxtFVIvt9pCqyGH",
      externalLink: "https://open.spotify.com/track/6d9IiDcFxtFVIvt9pCqyGH",
    },
    {
      release: "release/taylor-swift-2-speak-now-deluxe-edition",
      discNumber: 1,
      position: 2,
      externalId: "1q8E1FfFuhd12c5JcJwPxQ",
      externalLink: "https://open.spotify.com/track/1q8E1FfFuhd12c5JcJwPxQ",
    },
  ],
} as const satisfies Track
