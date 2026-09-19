import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jessicaBaioUnsaid = {
  id: "019ea4f9-0a1f-7dd1-8f66-e1e8bb94b031",
  type: "page-type/song",
  slug: "jessica-baio-unsaid",
  title: "unsaid",
  artist: "artist/jessica-baio",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "27ee24d2-d431-491f-9a8b-509af3f02a23",
      externalLink: "https://musicbrainz.org/recording/27ee24d2-d431-491f-9a8b-509af3f02a23",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
