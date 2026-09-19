import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyBestOf2023Walk = {
  id: "01a0b4c6-c7bd-7ed2-82a8-6ff3bd5d799f",
  type: "page-type/track",
  slug: "the-holderness-family-best-of-2023-walk",
  ownLength: 2.1316,
  ownProgress: 0,
  partOfCollections: ["release/the-holderness-family-best-of-2023"],
  position: 15,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4bI5uizVxLf55CYoes80Uu",
      externalLink: "https://open.spotify.com/track/4bI5uizVxLf55CYoes80Uu",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Walk!",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6tITG4T8LpC0msapZ4wXGA", artistName: "The Holderness Family" }],
  trackKey: "walk|6tITG4T8LpC0msapZ4wXGA|127896",
  song: "song/the-holderness-family-walk",
} as const satisfies Track
