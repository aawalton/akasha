import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonChemistryDownToYou = {
  id: "01a0a5ae-b8f6-73aa-acb3-2f007c309b31",
  type: "track",
  slug: "kelly-clarkson-chemistry-down-to-you",
  ownLength: 3.156816666666667,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-chemistry"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2eQHMd4pV6Tz6SeUDDI6Qu",
      externalLink: "https://open.spotify.com/track/2eQHMd4pV6Tz6SeUDDI6Qu",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "down to you",
} as const satisfies Track
