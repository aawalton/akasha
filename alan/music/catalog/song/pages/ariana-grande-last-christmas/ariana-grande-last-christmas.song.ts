import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeLastChristmas = {
  id: "019ea416-23c6-7f24-90f1-e843b1dee663",
  type: "page-type/song",
  slug: "ariana-grande-last-christmas",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8e438d29-bc0b-3cfe-8c47-17e14113a3c3",
      externalLink: "https://musicbrainz.org/work/8e438d29-bc0b-3cfe-8c47-17e14113a3c3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Last Christmas",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
