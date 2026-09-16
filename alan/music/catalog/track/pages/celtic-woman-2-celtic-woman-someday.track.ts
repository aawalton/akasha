import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2CelticWomanSomeday = {
  id: "01a0abea-7940-712b-ace4-e9d7459cf327",
  type: "page-type/track",
  slug: "celtic-woman-2-celtic-woman-someday",
  ownLength: 4.337983333333334,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-celtic-woman"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0QWsU7rdcjFrsVw2O2uC0J",
      externalLink: "https://open.spotify.com/track/0QWsU7rdcjFrsVw2O2uC0J",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Someday",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "someday|6NWtt9pNOL2Gx7kBykdE5x|260279",
} as const satisfies Track
