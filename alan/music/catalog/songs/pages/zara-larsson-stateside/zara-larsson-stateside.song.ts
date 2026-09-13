import type { Song } from "akasha/alan/music/catalog/songs/song.page-type.types.ts"

export const zaraLarssonStateside = {
  id: "019ea4a2-0fbd-7ab3-bc54-79e2c91fa284",
  type: "song",
  slug: "zara-larsson-stateside",
  title: "Stateside",
  artist: "zara-larsson",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f6bae4e7-c9a9-42a2-8c5d-527b366593f4",
      externalLink: "https://musicbrainz.org/work/f6bae4e7-c9a9-42a2-8c5d-527b366593f4",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
