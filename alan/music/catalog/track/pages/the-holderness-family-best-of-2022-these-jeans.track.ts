import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyBestOf2022TheseJeans = {
  id: "01a0b4c6-c98a-7e51-822d-ee4c79ecca7f",
  type: "page-type/track",
  slug: "the-holderness-family-best-of-2022-these-jeans",
  ownLength: 2.9983833333333334,
  ownProgress: 0,
  partOfCollections: ["release/the-holderness-family-best-of-2022"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1DQ5mGJxNgIdl3wZSdyWn4",
      externalLink: "https://open.spotify.com/track/1DQ5mGJxNgIdl3wZSdyWn4",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "These Jeans",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6tITG4T8LpC0msapZ4wXGA", artistName: "The Holderness Family" }],
  trackKey: "thesejeans|6tITG4T8LpC0msapZ4wXGA|179903",
  song: "song/the-holderness-family-these-jeans",
} as const satisfies Track
