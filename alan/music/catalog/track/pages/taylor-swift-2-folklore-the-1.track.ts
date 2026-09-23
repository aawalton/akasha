import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2FolkloreThe1 = {
  id: "01a0ce86-6b23-7452-bbb0-b1a669e4edf5",
  type: "page-type/track",
  slug: "taylor-swift-2-folklore-the-1",
  ownLength: 3.504183333333333,
  ownProgress: 0,
  partOfCollections: ["release/taylor-swift-2-folklore"],
  status: "not-started",
  unit: "unit/minutes",
  title: "the 1",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "the1|06HL4z0CvFAxyc27GXpf02|210251",
  song: "song/taylor-swift-the-1",
  carriedBy: [
    {
      release: "release/taylor-swift-2-folklore",
      discNumber: 1,
      position: 1,
      externalId: "0Jlcvv8IykzHaSmj49uNW8",
      externalLink: "https://open.spotify.com/track/0Jlcvv8IykzHaSmj49uNW8",
    },
  ],
} as const satisfies Track
