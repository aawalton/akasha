import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const emBeiholdWonTLetGo = {
  id: "019ea4df-6177-70e7-9c82-c6e15f3f5009",
  type: "page-type/song",
  slug: "em-beihold-won-t-let-go",
  title: "Won’t Let Go",
  artist: "artist/em-beihold",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b1079ebb-0918-4fb1-a36b-9fe5590d0fbb",
      externalLink: "https://musicbrainz.org/work/b1079ebb-0918-4fb1-a36b-9fe5590d0fbb",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
