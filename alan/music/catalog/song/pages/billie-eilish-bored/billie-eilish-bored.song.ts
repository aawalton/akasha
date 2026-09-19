import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishBored = {
  id: "01a0b771-0d61-7041-9f37-82a2c7d7f5e2",
  type: "page-type/song",
  slug: "billie-eilish-bored",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ab45b065-e3a1-499c-9367-d1f1db6ee674",
      externalLink: "https://musicbrainz.org/work/ab45b065-e3a1-499c-9367-d1f1db6ee674",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Bored",
  artist: "artist/billie-eilish",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
