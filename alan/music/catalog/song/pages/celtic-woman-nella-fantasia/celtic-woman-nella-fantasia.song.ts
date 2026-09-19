import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanNellaFantasia = {
  id: "01a0b720-0eaa-745c-b33c-55819ffe9a7b",
  type: "page-type/song",
  slug: "celtic-woman-nella-fantasia",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "75760085-843e-335f-8fed-d835d59e9f66",
      externalLink: "https://musicbrainz.org/work/75760085-843e-335f-8fed-d835d59e9f66",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Nella fantasia",
  artist: "artist/celtic-woman",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
