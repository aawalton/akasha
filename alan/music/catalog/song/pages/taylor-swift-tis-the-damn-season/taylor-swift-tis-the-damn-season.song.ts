import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftTisTheDamnSeason = {
  id: "019ea416-1087-7d53-be98-2db273b522f7",
  type: "page-type/song",
  slug: "taylor-swift-tis-the-damn-season",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a087f8e8-0834-4c0f-b5df-0f6d6aaf0bee",
      externalLink: "https://musicbrainz.org/work/a087f8e8-0834-4c0f-b5df-0f6d6aaf0bee",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "‘tis the damn season",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
