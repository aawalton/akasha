import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraComeCloser = {
  id: "019ea4a7-41e1-703e-b566-ea7b9985033f",
  type: "page-type/song",
  slug: "aurora-come-closer",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e6316a8d-35ac-42a0-9710-a946fd45f9ed",
      externalLink: "https://musicbrainz.org/work/e6316a8d-35ac-42a0-9710-a946fd45f9ed",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "COME CLOSER",
  artist: "artist/aurora",
  performed: false,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T00:34:45.345Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
