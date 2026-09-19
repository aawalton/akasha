import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyBestOfThe2000sFallOrNothingAtAll = {
  id: "01a0b4c6-cd68-7f85-8570-3605d93d1e67",
  type: "page-type/track",
  slug: "the-holderness-family-best-of-the-2000s-fall-or-nothing-at-all",
  ownLength: 4.0048,
  ownProgress: 0,
  partOfCollections: ["release/the-holderness-family-best-of-the-2000s"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0iCt5PWFYXtRLJJEkMphPH",
      externalLink: "https://open.spotify.com/track/0iCt5PWFYXtRLJJEkMphPH",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Fall or Nothing At All",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6tITG4T8LpC0msapZ4wXGA", artistName: "The Holderness Family" }],
  trackKey: "fallornothingatall|6tITG4T8LpC0msapZ4wXGA|240288",
  song: "song/the-holderness-family-fall-or-nothing-at-all",
} as const satisfies Track
