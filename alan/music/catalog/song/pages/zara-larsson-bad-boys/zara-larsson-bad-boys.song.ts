import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonBadBoys = {
  id: "019ea4a1-1243-7224-82bb-ffcf30384478",
  type: "page-type/song",
  slug: "zara-larsson-bad-boys",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b9ac643d-6701-40a9-92b5-f3a4f288e7dc",
      externalLink: "https://musicbrainz.org/work/b9ac643d-6701-40a9-92b5-f3a4f288e7dc",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Bad Boys",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
