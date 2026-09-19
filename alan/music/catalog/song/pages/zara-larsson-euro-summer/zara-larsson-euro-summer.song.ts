import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonEuroSummer = {
  id: "019ea49e-13a7-7d8b-b03d-05e573ceb29a",
  type: "page-type/song",
  slug: "zara-larsson-euro-summer",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "13cc6e8b-3479-4ec6-b8ab-4787069ae380",
      externalLink: "https://musicbrainz.org/work/13cc6e8b-3479-4ec6-b8ab-4787069ae380",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Euro Summer",
  artist: "artist/zara-larsson",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
