import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2AChristmasCelebrationTheWexfordCarol = {
  id: "01a0abea-77f0-7176-9657-ce2acf9956a9",
  type: "page-type/track",
  slug: "celtic-woman-2-a-christmas-celebration-the-wexford-carol",
  ownLength: 3.0688833333333334,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-a-christmas-celebration"],
  position: 14,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0HxFfvcePAN3Jec7Bgg1Rq",
      externalLink: "https://open.spotify.com/track/0HxFfvcePAN3Jec7Bgg1Rq",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "The Wexford Carol",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "thewexfordcarol|6NWtt9pNOL2Gx7kBykdE5x|184133",
  song: "song/celtic-woman-the-wexford-carol",
} as const satisfies Track
