import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2ANewJourneyGranuailesDance = {
  id: "01a0abea-74b0-784a-a531-c915f677118b",
  type: "page-type/track",
  slug: "celtic-woman-2-a-new-journey-granuailes-dance",
  ownLength: 3.6693333333333333,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-a-new-journey"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5wZW3wNmpUwS3706wAhp9a",
      externalLink: "https://open.spotify.com/track/5wZW3wNmpUwS3706wAhp9a",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Granuaile's Dance",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "granuailesdance|6NWtt9pNOL2Gx7kBykdE5x|220160",
  song: "song/celtic-woman-granuailes-dance",
} as const satisfies Track
