import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorSecretOLife = {
  id: "01a0b72f-504c-7a81-ab43-78b22313f0ad",
  type: "page-type/song",
  slug: "james-taylor-secret-o-life",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8a6711bf-2607-3754-b2ba-7f0dcadebb97",
      externalLink: "https://musicbrainz.org/work/8a6711bf-2607-3754-b2ba-7f0dcadebb97",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Secret o’ Life",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
