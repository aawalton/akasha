import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2HomeForChristmasWeThreeKings = {
  id: "01a0abea-6d90-7cf8-8e20-a26d6fdf3bc2",
  type: "page-type/track",
  slug: "celtic-woman-2-home-for-christmas-we-three-kings",
  ownLength: 3.6193333333333335,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-home-for-christmas"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "46Nsjnb8gupZ0rL54zXbaW",
      externalLink: "https://open.spotify.com/track/46Nsjnb8gupZ0rL54zXbaW",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "We Three Kings",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "wethreekings|6NWtt9pNOL2Gx7kBykdE5x|217160",
  song: "song/celtic-woman-we-three-kings",
} as const satisfies Track
