import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayTrouble = {
  id: "01a0ba60-f79e-712f-8eef-cc25349675b0",
  type: "page-type/song",
  slug: "coldplay-trouble",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ae256069-b3b1-34a4-88f5-3f2298139c5c",
      externalLink: "https://musicbrainz.org/work/ae256069-b3b1-34a4-88f5-3f2298139c5c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Trouble",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
