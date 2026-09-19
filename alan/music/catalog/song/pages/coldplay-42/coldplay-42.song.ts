import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplay42 = {
  id: "01a0ba5d-3b95-7d27-879d-947ccec8ed7e",
  type: "page-type/song",
  slug: "coldplay-42",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3419b23d-971a-302b-a2c6-36aa67439f71",
      externalLink: "https://musicbrainz.org/work/3419b23d-971a-302b-a2c6-36aa67439f71",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "42",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
