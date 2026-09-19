import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jessicaBaioEveryVersion = {
  id: "019ea4f7-722c-704c-b03f-54b532d102f5",
  type: "page-type/song",
  slug: "jessica-baio-every-version",
  title: "every version",
  artist: "artist/jessica-baio",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "49d39b84-2631-4f27-a5ce-b67b326fdd60",
      externalLink: "https://musicbrainz.org/recording/49d39b84-2631-4f27-a5ce-b67b326fdd60",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
