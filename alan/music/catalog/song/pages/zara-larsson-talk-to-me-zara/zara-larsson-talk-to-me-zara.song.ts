import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonTalkToMeZara = {
  id: "01a0b784-01d4-7779-a83b-735e81e921fd",
  type: "page-type/song",
  slug: "zara-larsson-talk-to-me-zara",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "19f6e461-86f8-4a51-99c0-f31aa7a919b9",
      externalLink: "https://musicbrainz.org/work/19f6e461-86f8-4a51-99c0-f31aa7a919b9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Talk To Me, Zara",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
