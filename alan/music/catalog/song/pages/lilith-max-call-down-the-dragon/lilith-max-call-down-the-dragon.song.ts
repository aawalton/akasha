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
  createdAt: "2026-06-08T02:00:21.710Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
