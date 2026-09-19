import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyBestOf2023DaddyDeuces = {
  id: "01a0b4c6-c719-70b1-a5dc-4f3a87870ac8",
  type: "page-type/track",
  slug: "the-holderness-family-best-of-2023-daddy-deuces",
  ownLength: 2.0543833333333335,
  ownProgress: 0,
  partOfCollections: ["release/the-holderness-family-best-of-2023"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7eYK9cYJvzPlXSTSdqAaj5",
      externalLink: "https://open.spotify.com/track/7eYK9cYJvzPlXSTSdqAaj5",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Daddy Deuces",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6tITG4T8LpC0msapZ4wXGA", artistName: "The Holderness Family" }],
  trackKey: "daddydeuces|6tITG4T8LpC0msapZ4wXGA|123263",
  song: "song/the-holderness-family-daddy-deuces",
} as const satisfies Track
