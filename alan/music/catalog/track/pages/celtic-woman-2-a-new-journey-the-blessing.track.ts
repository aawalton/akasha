import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2ANewJourneyTheBlessing = {
  id: "01a0abea-74d0-75a4-81f3-cb77e82e6cfd",
  type: "page-type/track",
  slug: "celtic-woman-2-a-new-journey-the-blessing",
  ownLength: 3.824,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-a-new-journey"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6LeAedD4ZcwueB0WizpJh8",
      externalLink: "https://open.spotify.com/track/6LeAedD4ZcwueB0WizpJh8",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "The Blessing",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "theblessing|6NWtt9pNOL2Gx7kBykdE5x|229440",
  song: "song/celtic-woman-the-blessing",
} as const satisfies Track
