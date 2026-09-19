import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanFieldsOfGold = {
  id: "01a0b720-15d3-7c59-9c7e-cac6fa1481f7",
  type: "page-type/song",
  slug: "celtic-woman-fields-of-gold",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f26619ec-5ab2-33c6-9186-56607b3f4568",
      externalLink: "https://musicbrainz.org/work/f26619ec-5ab2-33c6-9186-56607b3f4568",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Fields of Gold",
  artist: "artist/celtic-woman",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
