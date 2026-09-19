import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2SongsFromTheHeartGoodnightMyAngel = {
  id: "01a0abea-73c0-7425-8067-a2fd07b3f2b8",
  type: "page-type/track",
  slug: "celtic-woman-2-songs-from-the-heart-goodnight-my-angel",
  ownLength: 3.2477666666666667,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-songs-from-the-heart"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1NHvLJtzkf4QRTsyQh5YGJ",
      externalLink: "https://open.spotify.com/track/1NHvLJtzkf4QRTsyQh5YGJ",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Goodnight My Angel",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "goodnightmyangel|6NWtt9pNOL2Gx7kBykdE5x|194866",
  song: "song/celtic-woman-goodnight-my-angel",
} as const satisfies Track
