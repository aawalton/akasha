import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayHaveYourselfAMerryLittleChristmas = {
  id: "01a0ba5d-3b0f-7982-a24f-e677f1a1be9a",
  type: "page-type/song",
  slug: "coldplay-have-yourself-a-merry-little-christmas",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2ff51d26-cc88-443e-83b9-baf9cf244112",
      externalLink: "https://musicbrainz.org/work/2ff51d26-cc88-443e-83b9-baf9cf244112",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Have Yourself a Merry Little Christmas",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
