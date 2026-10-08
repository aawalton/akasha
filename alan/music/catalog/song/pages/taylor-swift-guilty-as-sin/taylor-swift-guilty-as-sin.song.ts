import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftGuiltyAsSin = {
  id: "019ea416-1e43-75a4-9e7a-e137f7100f59",
  type: "page-type/song",
  slug: "taylor-swift-guilty-as-sin",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "47fd8538-8693-4dba-b5e3-df7f973d810b",
      externalLink: "https://musicbrainz.org/work/47fd8538-8693-4dba-b5e3-df7f973d810b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Guilty as Sin?",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:13.507Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
