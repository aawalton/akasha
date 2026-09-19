import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayTheScientistTheScientist = {
  id: "01a0b9ef-0217-735b-bbe9-a2919e1e6f88",
  type: "page-type/track",
  slug: "coldplay-the-scientist-the-scientist",
  ownLength: 5.190433333333333,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-the-scientist"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2LTl1pU074hnzAdy0SpHAb",
      externalLink: "https://open.spotify.com/track/2LTl1pU074hnzAdy0SpHAb",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Scientist",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "thescientist|4gzpq5DPGxSnKTe4SA8HAU|311426",
  song: "song/coldplay-the-scientist",
} as const satisfies Track
