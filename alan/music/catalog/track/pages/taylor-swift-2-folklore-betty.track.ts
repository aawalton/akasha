import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2FolkloreBetty = {
  id: "01a0ce86-6d4f-7564-afae-e002f8b1ee53",
  type: "page-type/track",
  slug: "taylor-swift-2-folklore-betty",
  ownLength: 4.908683333333333,
  ownProgress: 0,
  partOfCollections: ["release/taylor-swift-2-folklore"],
  status: "not-started",
  unit: "unit/minutes",
  title: "betty",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "betty|06HL4z0CvFAxyc27GXpf02|294521",
  song: "song/taylor-swift-betty",
  carriedBy: [
    {
      release: "release/taylor-swift-2-folklore",
      discNumber: 1,
      position: 14,
      externalId: "5kI4eCXXzyuIUXjQra0Cxi",
      externalLink: "https://open.spotify.com/track/5kI4eCXXzyuIUXjQra0Cxi",
    },
  ],
} as const satisfies Track
