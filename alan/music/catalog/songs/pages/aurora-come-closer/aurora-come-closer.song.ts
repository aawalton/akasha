import type { Song } from "akasha/alan/music/catalog/songs/song.page-type.types.ts"

export const auroraComeCloser = {
  id: "019ea4a7-41e1-703e-b566-ea7b9985033f",
  type: "song",
  slug: "aurora-come-closer",
  title: "COME CLOSER",
  artist: "artist/aurora",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e6316a8d-35ac-42a0-9710-a946fd45f9ed",
      externalLink: "https://musicbrainz.org/work/e6316a8d-35ac-42a0-9710-a946fd45f9ed",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "original",
  performed: false,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
