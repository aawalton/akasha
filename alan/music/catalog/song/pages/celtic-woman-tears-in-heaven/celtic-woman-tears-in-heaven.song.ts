import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanTearsInHeaven = {
  id: "01a0b720-120e-7977-8469-2a69f330d209",
  type: "page-type/song",
  slug: "celtic-woman-tears-in-heaven",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b266015b-50f8-3526-933c-06e68e66e5d6",
      externalLink: "https://musicbrainz.org/work/b266015b-50f8-3526-933c-06e68e66e5d6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Tears in Heaven",
  artist: "artist/celtic-woman",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
