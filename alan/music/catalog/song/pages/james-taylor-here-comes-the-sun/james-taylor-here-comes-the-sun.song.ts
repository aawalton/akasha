import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorHereComesTheSun = {
  id: "01a0b72f-286a-7b3b-9157-9836d7c02388",
  type: "page-type/song",
  slug: "james-taylor-here-comes-the-sun",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8549de8e-f65b-3e64-b8a2-08c90cc5fdd1",
      externalLink: "https://musicbrainz.org/work/8549de8e-f65b-3e64-b8a2-08c90cc5fdd1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Here Comes the Sun",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
