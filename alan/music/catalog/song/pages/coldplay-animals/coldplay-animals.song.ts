import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayAnimals = {
  id: "01a0ba5d-40f2-7504-acf7-1a659b8582f2",
  type: "page-type/song",
  slug: "coldplay-animals",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "89ad197a-14a4-48fc-b5a8-3188064cd918",
      externalLink: "https://musicbrainz.org/work/89ad197a-14a4-48fc-b5a8-3188064cd918",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Animals",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
