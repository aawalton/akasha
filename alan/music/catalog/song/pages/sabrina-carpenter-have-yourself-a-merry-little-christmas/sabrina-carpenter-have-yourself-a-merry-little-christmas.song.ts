import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterHaveYourselfAMerryLittleChristmas = {
  id: "01a0b723-c27b-79d2-8691-dc27d1fa2831",
  type: "page-type/song",
  slug: "sabrina-carpenter-have-yourself-a-merry-little-christmas",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2ff51d26-cc88-443e-83b9-baf9cf244112",
      externalLink: "https://musicbrainz.org/work/2ff51d26-cc88-443e-83b9-baf9cf244112",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Have Yourself a Merry Little Christmas",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
