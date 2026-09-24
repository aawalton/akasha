import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2FearlessFearless = {
  id: "01a0ce86-8f17-7ff8-9ae2-2eeb353bb539",
  type: "page-type/track",
  slug: "taylor-swift-2-fearless-fearless",
  ownLength: 4.0331,
  ownProgress: 4.0331,
  partOfCollections: ["release/taylor-swift-2-fearless"],
  status: "completed",
  unit: "unit/minutes",
  title: "Fearless",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/taylor-swift" }],
  trackKey: "fearless|06HL4z0CvFAxyc27GXpf02|241986",
  song: "song/taylor-swift-fearless",
  carriedBy: [
    {
      release: "release/taylor-swift-2-fearless",
      discNumber: 1,
      position: 1,
      externalId: "6Eu31gddWw0gOGO506pJYA",
      externalLink: "https://open.spotify.com/track/6Eu31gddWw0gOGO506pJYA",
    },
  ],
} as const satisfies Track
