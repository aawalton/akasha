import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyBestOfThe2000sComplicated = {
  id: "01a0b4c6-cddc-708c-a91e-7bd79831cad4",
  type: "page-type/track",
  slug: "the-holderness-family-best-of-the-2000s-complicated",
  ownLength: 2.331183333333333,
  ownProgress: 0,
  partOfCollections: ["release/the-holderness-family-best-of-the-2000s"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2nj4j27YYXqlkZ14qgfRXs",
      externalLink: "https://open.spotify.com/track/2nj4j27YYXqlkZ14qgfRXs",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Complicated",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6tITG4T8LpC0msapZ4wXGA", artistName: "The Holderness Family" }],
  trackKey: "complicated|6tITG4T8LpC0msapZ4wXGA|139871",
  song: "song/the-holderness-family-complicated",
} as const satisfies Track
