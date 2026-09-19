import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayPrincessOfChina = {
  id: "01a0ba5d-53c1-75d9-beb7-907f32e742ff",
  type: "page-type/song",
  slug: "coldplay-princess-of-china",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8623af06-a485-4294-8f4e-1704bab07883",
      externalLink: "https://musicbrainz.org/work/8623af06-a485-4294-8f4e-1704bab07883",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Princess of China",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
