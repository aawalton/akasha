import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyBestOfThe80sAlgebra = {
  id: "01a0b4c6-ceed-77fe-81c4-55d8c11af486",
  type: "page-type/track",
  slug: "the-holderness-family-best-of-the-80s-algebra",
  ownLength: 2.4237,
  ownProgress: 0,
  partOfCollections: ["release/the-holderness-family-best-of-the-80s"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1FTOAZGCDYcIZDlnNzzG14",
      externalLink: "https://open.spotify.com/track/1FTOAZGCDYcIZDlnNzzG14",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Algebra",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6tITG4T8LpC0msapZ4wXGA", artistName: "The Holderness Family" }],
  trackKey: "algebra|6tITG4T8LpC0msapZ4wXGA|145422",
  song: "song/the-holderness-family-algebra",
} as const satisfies Track
