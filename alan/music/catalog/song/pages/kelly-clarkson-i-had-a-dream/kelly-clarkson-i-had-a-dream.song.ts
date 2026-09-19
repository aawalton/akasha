import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonIHadADream = {
  id: "019ea4b0-f095-7e36-a8a3-fcd6baba8875",
  type: "page-type/song",
  slug: "kelly-clarkson-i-had-a-dream",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f0b799ee-374c-47f6-8e6b-dea653e05dbf",
      externalLink: "https://musicbrainz.org/work/f0b799ee-374c-47f6-8e6b-dea653e05dbf",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Had a Dream",
  artist: "artist/kelly-clarkson",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
