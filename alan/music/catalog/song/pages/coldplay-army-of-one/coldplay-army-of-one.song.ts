import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayArmyOfOne = {
  id: "01a0ba5d-3e5d-7afa-a9a8-82a41a6f3a92",
  type: "page-type/song",
  slug: "coldplay-army-of-one",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6c7df932-2daa-462a-8d05-c817ef4e50f8",
      externalLink: "https://musicbrainz.org/work/6c7df932-2daa-462a-8d05-c817ef4e50f8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Army of One",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
