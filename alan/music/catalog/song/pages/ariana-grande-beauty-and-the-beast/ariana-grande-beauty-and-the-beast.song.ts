import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeBeautyAndTheBeast = {
  id: "019ea4e3-7d49-7065-b434-783e3f32adf8",
  type: "page-type/song",
  slug: "ariana-grande-beauty-and-the-beast",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "dea11511-4254-3ae2-b6c3-906ea502668a",
      externalLink: "https://musicbrainz.org/work/dea11511-4254-3ae2-b6c3-906ea502668a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Beauty and the Beast",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
