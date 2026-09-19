import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2ANewJourneyCaledonia = {
  id: "01a0abea-7550-76d9-9057-7aea1df351c7",
  type: "page-type/track",
  slug: "celtic-woman-2-a-new-journey-caledonia",
  ownLength: 4.990433333333334,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-a-new-journey"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4arr5VKJbKO8PO5OY27NrM",
      externalLink: "https://open.spotify.com/track/4arr5VKJbKO8PO5OY27NrM",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Caledonia",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "caledonia|6NWtt9pNOL2Gx7kBykdE5x|299426",
  song: "song/celtic-woman-caledonia",
} as const satisfies Track
