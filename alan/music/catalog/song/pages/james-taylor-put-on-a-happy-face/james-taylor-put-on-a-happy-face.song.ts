import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorPutOnAHappyFace = {
  id: "01a0b72f-3d38-7867-85b3-9810fd925b3f",
  type: "page-type/song",
  slug: "james-taylor-put-on-a-happy-face",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ab1b0bcb-07db-31cb-8a2c-07c980f1e56c",
      externalLink: "https://musicbrainz.org/work/ab1b0bcb-07db-31cb-8a2c-07c980f1e56c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Put On a Happy Face",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
