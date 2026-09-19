import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiCharonSObol = {
  id: "019f0e9d-5060-709c-b901-e5788bff94f8",
  type: "page-type/song",
  slug: "mitski-charon-s-obol",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2373c012-fb5c-4d05-a9d5-a97142c53dfa",
      externalLink: "https://musicbrainz.org/work/2373c012-fb5c-4d05-a9d5-a97142c53dfa",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Charon’s Obol",
  artist: "artist/mitski",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
