import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2LoverMissAmericanaTheHeartbreakPrince = {
  id: "01a0ce86-6ecb-7798-99a1-766a356158af",
  type: "page-type/track",
  slug: "taylor-swift-2-lover-miss-americana-the-heartbreak-prince",
  ownLength: 3.902433333333333,
  ownProgress: 0,
  partOfCollections: ["release/taylor-swift-2-lover"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Miss Americana & The Heartbreak Prince",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "missamericanatheheartbreakprince|06HL4z0CvFAxyc27GXpf02|234146",
  song: "song/taylor-swift-miss-americana-the-heartbreak-prince",
  carriedBy: [
    {
      release: "release/taylor-swift-2-lover",
      discNumber: 1,
      position: 7,
      externalId: "214nt20w5wOxJnY462klLw",
      externalLink: "https://open.spotify.com/track/214nt20w5wOxJnY462klLw",
    },
  ],
} as const satisfies Track
