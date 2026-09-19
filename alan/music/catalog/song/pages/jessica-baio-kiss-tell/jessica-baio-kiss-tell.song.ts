import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jessicaBaioKissTell = {
  id: "019ea4f7-e888-7075-88bd-af160dd6589d",
  type: "page-type/song",
  slug: "jessica-baio-kiss-tell",
  title: "kiss & tell",
  artist: "artist/jessica-baio",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ef3a60a1-0963-4b33-b873-df0bdd18ae83",
      externalLink: "https://musicbrainz.org/recording/ef3a60a1-0963-4b33-b873-df0bdd18ae83",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
