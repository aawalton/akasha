import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2CelebrationYouRaiseMeUp = {
  id: "01a0abea-557e-7a4c-9b82-8b526919c961",
  type: "page-type/track",
  slug: "celtic-woman-2-celebration-you-raise-me-up",
  ownLength: 4.7291,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-celebration"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1HDFGwFL9AIAxBidsFuhlb",
      externalLink: "https://open.spotify.com/track/1HDFGwFL9AIAxBidsFuhlb",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "You Raise Me Up",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "youraisemeup|6NWtt9pNOL2Gx7kBykdE5x|283746",
  song: "song/celtic-woman-you-raise-me-up",
} as const satisfies Track
