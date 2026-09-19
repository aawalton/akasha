import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanHaveYourselfAMerryLittleChristmas = {
  id: "01a0b720-0a26-7729-a821-a42d96fd9093",
  type: "page-type/song",
  slug: "celtic-woman-have-yourself-a-merry-little-christmas",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2ff51d26-cc88-443e-83b9-baf9cf244112",
      externalLink: "https://musicbrainz.org/work/2ff51d26-cc88-443e-83b9-baf9cf244112",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Have Yourself a Merry Little Christmas",
  artist: "artist/celtic-woman",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
