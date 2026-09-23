import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift21989DeluxeEditionNewRomantics = {
  id: "01a0ce86-8081-7baa-aa5e-a0da4250009a",
  type: "page-type/track",
  slug: "taylor-swift-2-1989-deluxe-edition-new-romantics",
  ownLength: 3.8411,
  ownProgress: 3.8411,
  partOfCollections: ["release/taylor-swift-2-1989-deluxe-edition"],
  status: "completed",
  unit: "unit/minutes",
  title: "New Romantics",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "newromantics|06HL4z0CvFAxyc27GXpf02|230466",
  song: "song/taylor-swift-new-romantics",
  carriedBy: [
    {
      release: "release/taylor-swift-2-1989-deluxe-edition",
      discNumber: 1,
      position: 16,
      externalId: "6rZVy6FIG7lSJQMFXHo12z",
      externalLink: "https://open.spotify.com/track/6rZVy6FIG7lSJQMFXHo12z",
    },
  ],
} as const satisfies Track
