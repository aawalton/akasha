import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayYellow = {
  id: "01a0ba60-ff64-752b-8137-7a464c8643b2",
  type: "page-type/song",
  slug: "coldplay-yellow",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "62781ea5-0a85-3ece-a8d4-da832131a988",
      externalLink: "https://musicbrainz.org/work/62781ea5-0a85-3ece-a8d4-da832131a988",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Yellow",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
