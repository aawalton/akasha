import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysRollingInTheDeep = {
  id: "01a0b71e-9d38-75df-80b1-6a0a713d4f0e",
  type: "page-type/song",
  slug: "the-piano-guys-rolling-in-the-deep",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c0c0fc29-4599-4803-a9c2-59ce2ee8d7d9",
      externalLink: "https://musicbrainz.org/work/c0c0fc29-4599-4803-a9c2-59ce2ee8d7d9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Rolling in the Deep",
  artist: "artist/the-piano-guys",
  songType: "derivative",
  performed: true,
} as const satisfies Song
