import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jessicaBaioHowToSayGoodbye = {
  id: "019ea4f7-c143-7537-bd9f-c09b40b4f1e9",
  type: "page-type/song",
  slug: "jessica-baio-how-to-say-goodbye",
  title: "How To Say Goodbye",
  artist: "artist/jessica-baio",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "480abb59-9922-4836-85e1-5ebd1168724c",
      externalLink: "https://musicbrainz.org/recording/480abb59-9922-4836-85e1-5ebd1168724c",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
