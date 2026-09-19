import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const lilithMaxCallDownTheDragon = {
  id: "019ea4f5-a1ce-7a2b-a95a-3b855db848e9",
  type: "page-type/song",
  slug: "lilith-max-call-down-the-dragon",
  title: "Call Down the Dragon",
  artist: "artist/lilith-max",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c3028969-4508-4ed6-a213-c22799a0f9dd",
      externalLink: "https://musicbrainz.org/recording/c3028969-4508-4ed6-a213-c22799a0f9dd",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
