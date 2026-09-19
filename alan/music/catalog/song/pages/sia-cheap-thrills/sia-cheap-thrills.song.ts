import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaCheapThrills = {
  id: "019ea4c4-643d-736d-9b56-237d6669fb09",
  type: "page-type/song",
  slug: "sia-cheap-thrills",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7b77da28-cf99-40c9-94a3-16e16363239e",
      externalLink: "https://musicbrainz.org/work/7b77da28-cf99-40c9-94a3-16e16363239e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Cheap Thrills",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
