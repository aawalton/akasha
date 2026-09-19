import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeWarningSignsInterlude = {
  id: "01a0b76f-f498-7787-9c47-bf05024959f9",
  type: "page-type/song",
  slug: "ariana-grande-warning-signs-interlude",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d2ebbf7a-1a3e-4c08-9cc4-89e8a3717a58",
      externalLink: "https://musicbrainz.org/work/d2ebbf7a-1a3e-4c08-9cc4-89e8a3717a58",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "warning signs (interlude)",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
