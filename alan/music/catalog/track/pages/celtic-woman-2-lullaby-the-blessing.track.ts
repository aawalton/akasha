import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2LullabyTheBlessing = {
  id: "01a0abea-71ee-7167-ad81-2df720fa0a4d",
  type: "page-type/track",
  slug: "celtic-woman-2-lullaby-the-blessing",
  ownLength: 3.862,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-lullaby"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6G6NlVtzCW4asCmlYm0SUs",
      externalLink: "https://open.spotify.com/track/6G6NlVtzCW4asCmlYm0SUs",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "The Blessing",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "theblessing|6NWtt9pNOL2Gx7kBykdE5x|231720",
} as const satisfies Track
