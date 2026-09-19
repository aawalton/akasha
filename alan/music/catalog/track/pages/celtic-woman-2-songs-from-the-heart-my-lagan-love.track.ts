import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2SongsFromTheHeartMyLaganLove = {
  id: "01a0abea-72d9-7113-a374-c0c538b7db03",
  type: "page-type/track",
  slug: "celtic-woman-2-songs-from-the-heart-my-lagan-love",
  ownLength: 2.882,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-songs-from-the-heart"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2jUzgcSBRIWdUxlomlgfWi",
      externalLink: "https://open.spotify.com/track/2jUzgcSBRIWdUxlomlgfWi",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "My Lagan Love",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "mylaganlove|6NWtt9pNOL2Gx7kBykdE5x|172920",
  song: "song/celtic-woman-my-lagan-love",
} as const satisfies Track
