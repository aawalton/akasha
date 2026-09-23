import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2FolkloreThisIsMeTrying = {
  id: "01a0ce86-6c7e-7497-941b-7afd9cab7080",
  type: "page-type/track",
  slug: "taylor-swift-2-folklore-this-is-me-trying",
  ownLength: 3.2516166666666666,
  ownProgress: 0,
  partOfCollections: ["release/taylor-swift-2-folklore"],
  status: "not-started",
  unit: "unit/minutes",
  title: "this is me trying",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "thisismetrying|06HL4z0CvFAxyc27GXpf02|195097",
  song: "song/taylor-swift-this-is-me-trying",
  carriedBy: [
    {
      release: "release/taylor-swift-2-folklore",
      discNumber: 1,
      position: 9,
      externalId: "7kt9e9LFSpN1zQtYEl19o1",
      externalLink: "https://open.spotify.com/track/7kt9e9LFSpN1zQtYEl19o1",
    },
  ],
} as const satisfies Track
