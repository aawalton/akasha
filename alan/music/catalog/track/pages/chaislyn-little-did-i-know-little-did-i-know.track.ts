import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const chaislynLittleDidIKnowLittleDidIKnow = {
  id: "01a0b9ec-97bd-795d-b154-bcc1c0705244",
  type: "page-type/track",
  slug: "chaislyn-little-did-i-know-little-did-i-know",
  ownLength: 3.76075,
  ownProgress: 0,
  partOfCollections: ["release/chaislyn-little-did-i-know"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2VjUQtqRCUcVH6mlfSWkuC",
      externalLink: "https://open.spotify.com/track/2VjUQtqRCUcVH6mlfSWkuC",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Little Did I Know",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "3zmbniiciaBAJlSX1Bzq9R", artistName: "Chaislyn" }],
  trackKey: "littledidiknow|3zmbniiciaBAJlSX1Bzq9R|225645",
  song: "song/chaislyn-little-did-i-know",
} as const satisfies Track
