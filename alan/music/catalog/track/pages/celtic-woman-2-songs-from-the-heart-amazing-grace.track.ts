import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2SongsFromTheHeartAmazingGrace = {
  id: "01a0abea-728b-7f86-bbb4-bc5a23443bf8",
  type: "page-type/track",
  slug: "celtic-woman-2-songs-from-the-heart-amazing-grace",
  ownLength: 4.972,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-songs-from-the-heart"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3ktkmx2gmshDYiURNgJbOp",
      externalLink: "https://open.spotify.com/track/3ktkmx2gmshDYiURNgJbOp",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Amazing Grace",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "amazinggrace|6NWtt9pNOL2Gx7kBykdE5x|298320",
  song: "song/celtic-woman-amazing-grace",
} as const satisfies Track
