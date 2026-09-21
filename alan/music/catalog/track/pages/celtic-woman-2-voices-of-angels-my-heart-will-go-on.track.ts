import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2VoicesOfAngelsMyHeartWillGoOn = {
  id: "01a0abea-5f98-7b7e-a66b-e2f2bd609430",
  type: "page-type/track",
  slug: "celtic-woman-2-voices-of-angels-my-heart-will-go-on",
  ownLength: 4.350666666666666,
  ownProgress: 4.350666666666666,
  partOfCollections: ["release/celtic-woman-2-voices-of-angels"],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3K9VhfnAyqfEQKC5y6yDVP",
      externalLink: "https://open.spotify.com/track/3K9VhfnAyqfEQKC5y6yDVP",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "My Heart Will Go On",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "myheartwillgoon|6NWtt9pNOL2Gx7kBykdE5x|261040",
  song: "song/celtic-woman-my-heart-will-go-on",
  carriedBy: [
    {
      release: "release/celtic-woman-2-voices-of-angels",
      discNumber: 1,
      position: 1,
      externalId: "3K9VhfnAyqfEQKC5y6yDVP",
      externalLink: "https://open.spotify.com/track/3K9VhfnAyqfEQKC5y6yDVP",
    },
  ],
} as const satisfies Track
