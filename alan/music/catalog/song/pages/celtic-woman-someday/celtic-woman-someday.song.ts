import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanSomeday = {
  id: "01a0b720-13f9-79b7-a641-0f7745aaf164",
  type: "page-type/song",
  slug: "celtic-woman-someday",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c32601c1-cae1-3343-bafb-39c559eb4892",
      externalLink: "https://musicbrainz.org/work/c32601c1-cae1-3343-bafb-39c559eb4892",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Someday",
  artist: "artist/celtic-woman",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
