import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayWotwPotp = {
  id: "01a0ba61-0058-7d0f-bd0c-1cc7fe9d04f3",
  type: "page-type/song",
  slug: "coldplay-wotw-potp",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "dadcd0cb-484e-43e9-97ec-1d1b3b2f1d22",
      externalLink: "https://musicbrainz.org/work/dadcd0cb-484e-43e9-97ec-1d1b3b2f1d22",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "WOTW/POTP",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
