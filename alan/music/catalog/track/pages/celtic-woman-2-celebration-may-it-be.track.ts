import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2CelebrationMayItBe = {
  id: "01a0abea-5512-7035-a731-c95eaf7cfca3",
  type: "page-type/track",
  slug: "celtic-woman-2-celebration-may-it-be",
  ownLength: 3.80555,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-celebration"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7tyM9K5t1HgymV1XZZ8Xq5",
      externalLink: "https://open.spotify.com/track/7tyM9K5t1HgymV1XZZ8Xq5",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "May It Be",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "mayitbe|6NWtt9pNOL2Gx7kBykdE5x|228333",
  song: "song/celtic-woman-may-it-be",
} as const satisfies Track
