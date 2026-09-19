import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraSomewhereElse = {
  id: "019ea4a4-6911-742a-9f4a-1a3bdee32748",
  type: "page-type/song",
  slug: "aurora-somewhere-else",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4368ec16-3f0c-4fb3-b550-83387b5084af",
      externalLink: "https://musicbrainz.org/work/4368ec16-3f0c-4fb3-b550-83387b5084af",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "SOMEWHERE ELSE",
  artist: "artist/aurora",
  songType: "original",
  performed: false,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
