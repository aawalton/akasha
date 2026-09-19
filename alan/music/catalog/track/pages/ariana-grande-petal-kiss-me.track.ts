import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandePetalKissMe = {
  id: "01a0a6c5-03df-76a2-9682-f4cdfd7b6913",
  type: "page-type/track",
  slug: "ariana-grande-petal-kiss-me",
  ownLength: 3.6597333333333335,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-petal"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0lok0VDJn0zRvHLBCITSSw",
      externalLink: "https://open.spotify.com/track/0lok0VDJn0zRvHLBCITSSw",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "kiss me",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "kissme|66CXWjxzNUsdJxJ2JdwvnR|219584",
  song: "song/ariana-grande-kiss-me",
} as const satisfies Track
