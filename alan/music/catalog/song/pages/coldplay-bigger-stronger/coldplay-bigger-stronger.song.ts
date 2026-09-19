import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayBiggerStronger = {
  id: "01a0ba5d-3a7c-7895-a04b-cc8e4d443ae8",
  type: "page-type/song",
  slug: "coldplay-bigger-stronger",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2524d0c7-1994-428d-a343-c0f893fd7eca",
      externalLink: "https://musicbrainz.org/work/2524d0c7-1994-428d-a343-c0f893fd7eca",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Bigger Stronger",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
