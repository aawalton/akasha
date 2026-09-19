import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayInk = {
  id: "01a0ba60-f701-7e64-afc5-8a6c44106383",
  type: "page-type/song",
  slug: "coldplay-ink",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "abafff85-c74e-4e7c-9464-0585fc33b57a",
      externalLink: "https://musicbrainz.org/work/abafff85-c74e-4e7c-9464-0585fc33b57a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Ink",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
