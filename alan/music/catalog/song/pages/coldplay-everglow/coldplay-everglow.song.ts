import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayEverglow = {
  id: "01a0ba5d-3ab0-71fd-acf1-44c02347c3a9",
  type: "page-type/song",
  slug: "coldplay-everglow",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "29133104-e06a-40e7-93cb-fe7e8dfab8ac",
      externalLink: "https://musicbrainz.org/work/29133104-e06a-40e7-93cb-fe7e8dfab8ac",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Everglow",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
