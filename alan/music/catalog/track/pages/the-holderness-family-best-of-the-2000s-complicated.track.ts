import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyBestOfThe2000sComplicated = {
  id: "01a0b4c6-cddc-708c-a91e-7bd79831cad4",
  type: "page-type/track",
  slug: "the-holderness-family-best-of-the-2000s-complicated",
  ownLength: 2.331183333333333,
  ownProgress: 2.331183333333333,
  partOfCollections: ["release/the-holderness-family-best-of-the-2000s"],
  status: "completed",
  unit: "unit/minutes",
  title: "Complicated",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-holderness-family" }],
  trackKey: "complicated|6tITG4T8LpC0msapZ4wXGA|139871",
  song: "song/the-holderness-family-complicated",
  carriedBy: [
    {
      release: "release/the-holderness-family-best-of-the-2000s",
      discNumber: 1,
      position: 6,
      externalId: "2nj4j27YYXqlkZ14qgfRXs",
      externalLink: "https://open.spotify.com/track/2nj4j27YYXqlkZ14qgfRXs",
    },
  ],
} as const satisfies Track
