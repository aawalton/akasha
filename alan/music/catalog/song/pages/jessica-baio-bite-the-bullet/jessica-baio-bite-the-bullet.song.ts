import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jessicaBaioBiteTheBullet = {
  id: "019ea4f7-2e73-7a11-901d-2b18c2d29e4f",
  type: "page-type/song",
  slug: "jessica-baio-bite-the-bullet",
  title: "bite the bullet",
  artist: "artist/jessica-baio",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7a1ad5e8-4f38-46a4-ae25-29a5c7070617",
      externalLink: "https://musicbrainz.org/recording/7a1ad5e8-4f38-46a4-ae25-29a5c7070617",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
