import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyBestOfThe90sBabyGotClass = {
  id: "01a0b4c6-d1b2-77ad-b42d-291473f158b6",
  type: "page-type/track",
  slug: "the-holderness-family-best-of-the-90s-baby-got-class",
  ownLength: 2.2008,
  ownProgress: 0,
  partOfCollections: ["release/the-holderness-family-best-of-the-90s"],
  position: 15,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1OEr2MIxehsPIiQnjdDpcE",
      externalLink: "https://open.spotify.com/track/1OEr2MIxehsPIiQnjdDpcE",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Baby Got Class",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6tITG4T8LpC0msapZ4wXGA", artistName: "The Holderness Family" }],
  trackKey: "babygotclass|6tITG4T8LpC0msapZ4wXGA|132048",
  song: "song/the-holderness-family-baby-got-class",
} as const satisfies Track
