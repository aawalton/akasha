import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2AChristmasCelebrationCarolOfTheBells = {
  id: "01a0abea-771d-7149-afa8-5540b1b19f08",
  type: "page-type/track",
  slug: "celtic-woman-2-a-christmas-celebration-carol-of-the-bells",
  ownLength: 2.3162166666666666,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-a-christmas-celebration"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "77S7uMHFlr3U6KyMUVgD17",
      externalLink: "https://open.spotify.com/track/77S7uMHFlr3U6KyMUVgD17",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Carol Of The Bells",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "carolofthebells|6NWtt9pNOL2Gx7kBykdE5x|138973",
  song: "song/celtic-woman-carol-of-the-bells",
} as const satisfies Track
