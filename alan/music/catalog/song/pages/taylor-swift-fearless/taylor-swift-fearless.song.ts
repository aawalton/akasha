import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftFearless = {
  id: "019ea416-1e78-7915-a213-4e0496f203fa",
  type: "page-type/song",
  slug: "taylor-swift-fearless",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "49ad745e-cb41-327a-8544-dba449a766eb",
      externalLink: "https://musicbrainz.org/work/49ad745e-cb41-327a-8544-dba449a766eb",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Fearless",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:13.560Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
