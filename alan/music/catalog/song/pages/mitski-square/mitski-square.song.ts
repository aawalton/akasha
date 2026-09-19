import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiSquare = {
  id: "019f0e9e-1168-7ac9-93c7-860e4faa5898",
  type: "page-type/song",
  slug: "mitski-square",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2cf20ced-2166-4d1c-ae63-f372da062b73",
      externalLink: "https://musicbrainz.org/work/2cf20ced-2166-4d1c-ae63-f372da062b73",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Square",
  artist: "artist/mitski",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
