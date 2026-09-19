import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayPourMe = {
  id: "01a0ba5d-4cf0-7017-a90e-dc0ccc06b78b",
  type: "page-type/song",
  slug: "coldplay-pour-me",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2323d87c-c77d-4a8b-8a7b-63bdc06e9750",
      externalLink: "https://musicbrainz.org/work/2323d87c-c77d-4a8b-8a7b-63bdc06e9750",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Pour Me",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
