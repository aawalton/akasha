import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonChemistryDeluxeIWontGiveUp = {
  id: "01a0a5ae-b76a-74a8-b726-353d019a43ef",
  type: "track",
  slug: "kelly-clarkson-chemistry-deluxe-i-wont-give-up",
  ownLength: 3.482683333333333,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-chemistry-deluxe"],
  position: 15,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4n4uo30J7VM6fyT7OJkoUO",
      externalLink: "https://open.spotify.com/track/4n4uo30J7VM6fyT7OJkoUO",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "i won’t give up",
} as const satisfies Track
