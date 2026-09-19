import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplaySleepingSun = {
  id: "01a0ba60-fe7f-71be-b5ab-0d0c654c0db1",
  type: "page-type/song",
  slug: "coldplay-sleeping-sun",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f97875af-7180-4615-a9c3-5de404680a4b",
      externalLink: "https://musicbrainz.org/work/f97875af-7180-4615-a9c3-5de404680a4b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Sleeping Sun",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
