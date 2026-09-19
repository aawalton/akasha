import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2NollaigAChristmasJourneySilverBells = {
  id: "01a0abea-50f5-753c-9ee0-fe72562a7bfd",
  type: "page-type/track",
  slug: "celtic-woman-2-nollaig-a-christmas-journey-silver-bells",
  ownLength: 3.79665,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-nollaig-a-christmas-journey"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4wY2fkmYeRvD1aTc4YWii4",
      externalLink: "https://open.spotify.com/track/4wY2fkmYeRvD1aTc4YWii4",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Silver Bells",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "silverbells|6NWtt9pNOL2Gx7kBykdE5x|227799",
  song: "song/celtic-woman-silver-bells",
} as const satisfies Track
