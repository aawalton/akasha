import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2DestinyTheHillsOfIreland = {
  id: "01a0abea-69fc-700f-980e-fa1e3b0f9176",
  type: "page-type/track",
  slug: "celtic-woman-2-destiny-the-hills-of-ireland",
  ownLength: 3.2007,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-destiny"],
  position: 16,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "52Mclc4OjcfWvFl7UL8miX",
      externalLink: "https://open.spotify.com/track/52Mclc4OjcfWvFl7UL8miX",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "The Hills Of Ireland",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "thehillsofireland|6NWtt9pNOL2Gx7kBykdE5x|192042",
} as const satisfies Track
