import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayDeMusicaLigera = {
  id: "01a0ba5d-478b-7af6-91de-bc3f467ed447",
  type: "page-type/song",
  slug: "coldplay-de-musica-ligera",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d62e1fec-adf8-3a0a-9ce9-f65bd5209e66",
      externalLink: "https://musicbrainz.org/work/d62e1fec-adf8-3a0a-9ce9-f65bd5209e66",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "De música ligera",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
