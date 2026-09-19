import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayFlags = {
  id: "01a0ba5d-424a-768a-85a3-b2be722946e9",
  type: "page-type/song",
  slug: "coldplay-flags",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "93824f04-84a1-47a5-9b28-7a5a1ebfc004",
      externalLink: "https://musicbrainz.org/work/93824f04-84a1-47a5-9b28-7a5a1ebfc004",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Flags",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
