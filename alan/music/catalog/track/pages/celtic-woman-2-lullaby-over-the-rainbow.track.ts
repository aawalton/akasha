import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2LullabyOverTheRainbow = {
  id: "01a0abea-717a-7496-922a-c67f08cab2e9",
  type: "page-type/track",
  slug: "celtic-woman-2-lullaby-over-the-rainbow",
  ownLength: 2.6631,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-lullaby"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "10BNUjunt6fxgWMidjpASq",
      externalLink: "https://open.spotify.com/track/10BNUjunt6fxgWMidjpASq",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Over The Rainbow",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "overtherainbow|6NWtt9pNOL2Gx7kBykdE5x|159786",
  song: "song/celtic-woman-over-the-rainbow",
} as const satisfies Track
