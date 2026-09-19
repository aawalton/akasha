import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonMaryDidYouKnow = {
  id: "019ea49d-e4e5-7e70-85fa-0d044c11a2ad",
  type: "page-type/song",
  slug: "zara-larsson-mary-did-you-know",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0d13f922-ddbb-4382-83bb-a500c37ca563",
      externalLink: "https://musicbrainz.org/work/0d13f922-ddbb-4382-83bb-a500c37ca563",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Mary, Did You Know?",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
