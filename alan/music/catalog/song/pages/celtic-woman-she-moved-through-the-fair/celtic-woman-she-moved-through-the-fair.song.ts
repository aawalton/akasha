import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanSheMovedThroughTheFair = {
  id: "01a0b720-138e-7812-96a1-03517b8efe20",
  type: "page-type/song",
  slug: "celtic-woman-she-moved-through-the-fair",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c27b554d-ec41-39c4-bcf8-d1da61731e8d",
      externalLink: "https://musicbrainz.org/work/c27b554d-ec41-39c4-bcf8-d1da61731e8d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "She Moved Through the Fair",
  artist: "artist/celtic-woman",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
