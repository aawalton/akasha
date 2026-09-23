import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2SpeakNowTaylorSVersionSparksFlyTaylorsVersion = {
  id: "01a0ce86-460d-7bfa-9973-21b873cd7560",
  type: "page-type/track",
  slug: "taylor-swift-2-speak-now-taylor-s-version-sparks-fly-taylors-version",
  ownLength: 4.353833333333333,
  ownProgress: 0,
  partOfCollections: ["release/taylor-swift-2-speak-now-taylor-s-version"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Sparks Fly (Taylor’s Version)",
  trackType: "version",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "sparksflytaylorsversion|06HL4z0CvFAxyc27GXpf02|261230",
  song: "song/taylor-swift-sparks-fly",
  carriedBy: [
    {
      release: "release/taylor-swift-2-speak-now-taylor-s-version",
      discNumber: 1,
      position: 2,
      externalId: "3MytWN8L7shNYzGl4tAKRp",
      externalLink: "https://open.spotify.com/track/3MytWN8L7shNYzGl4tAKRp",
    },
  ],
} as const satisfies Track
