import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2OverTheRainbowOverTheRainbow = {
  id: "01a0abea-7cf8-7143-af42-5048c2d667c3",
  type: "page-type/track",
  slug: "celtic-woman-2-over-the-rainbow-over-the-rainbow",
  ownLength: 3.4053333333333335,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-over-the-rainbow"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6CMD5M18Gw5MG3rcdi5EpO",
      externalLink: "https://open.spotify.com/track/6CMD5M18Gw5MG3rcdi5EpO",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Over The Rainbow",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "overtherainbow|6NWtt9pNOL2Gx7kBykdE5x|204320",
  song: "song/celtic-woman-over-the-rainbow",
} as const satisfies Track
