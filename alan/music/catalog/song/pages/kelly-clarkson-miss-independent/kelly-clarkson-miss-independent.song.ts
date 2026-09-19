import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonMissIndependent = {
  id: "019ea4b0-88d9-708d-bdce-15b3e0d64ef3",
  type: "page-type/song",
  slug: "kelly-clarkson-miss-independent",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d70d9069-41ac-31ee-84e1-59292d79ff01",
      externalLink: "https://musicbrainz.org/work/d70d9069-41ac-31ee-84e1-59292d79ff01",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Miss Independent",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
