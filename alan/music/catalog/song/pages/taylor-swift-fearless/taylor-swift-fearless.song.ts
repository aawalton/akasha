import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftFearless = {
  id: "019ea416-1e78-7915-a213-4e0496f203fa",
  type: "page-type/song",
  slug: "taylor-swift-fearless",
  title: "Fearless",
  artist: "artist/taylor-swift",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "49ad745e-cb41-327a-8544-dba449a766eb",
      externalLink: "https://musicbrainz.org/work/49ad745e-cb41-327a-8544-dba449a766eb",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
