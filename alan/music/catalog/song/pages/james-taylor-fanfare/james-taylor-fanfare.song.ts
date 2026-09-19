import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorFanfare = {
  id: "01a0b72f-2d2d-75ab-99cc-d7d94b7fecd2",
  type: "page-type/song",
  slug: "james-taylor-fanfare",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "bb6f1e2f-f32f-4d11-8d21-f004bf297cd2",
      externalLink: "https://musicbrainz.org/work/bb6f1e2f-f32f-4d11-8d21-f004bf297cd2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Fanfare",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
