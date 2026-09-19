import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiHumpty = {
  id: "019f0ea3-b39d-702e-931c-a003d6f70658",
  type: "page-type/song",
  slug: "mitski-humpty",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8ff9b4b0-b9e8-4509-9e31-3cc1ff2d20f8",
      externalLink: "https://musicbrainz.org/work/8ff9b4b0-b9e8-4509-9e31-3cc1ff2d20f8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Humpty",
  artist: "artist/mitski",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
