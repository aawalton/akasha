import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftClean = {
  id: "019ea416-06c6-7945-bbee-dfce8111f85f",
  type: "page-type/song",
  slug: "taylor-swift-clean",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3e70b356-83a0-4fbf-8df4-3e5755c6d9fe",
      externalLink: "https://musicbrainz.org/work/3e70b356-83a0-4fbf-8df4-3e5755c6d9fe",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Clean",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
