import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyBestOf2023Maycember = {
  id: "01a0b4c6-c73a-745b-84e2-8a9699e444b0",
  type: "page-type/track",
  slug: "the-holderness-family-best-of-2023-maycember",
  ownLength: 3.0668,
  ownProgress: 3.0668,
  partOfCollections: ["release/the-holderness-family-best-of-2023"],
  status: "completed",
  unit: "unit/minutes",
  title: "Maycember",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-holderness-family" }],
  trackKey: "maycember|6tITG4T8LpC0msapZ4wXGA|184008",
  song: "song/the-holderness-family-maycember",
  carriedBy: [
    {
      release: "release/the-holderness-family-best-of-2023",
      discNumber: 1,
      position: 11,
      externalId: "2gU36T7Y9RyEXikgUstvD4",
      externalLink: "https://open.spotify.com/track/2gU36T7Y9RyEXikgUstvD4",
    },
  ],
} as const satisfies Track
