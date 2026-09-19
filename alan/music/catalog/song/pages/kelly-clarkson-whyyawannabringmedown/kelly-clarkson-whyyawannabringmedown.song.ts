import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonWhyyawannabringmedown = {
  id: "019ea4b2-8963-7d05-b824-7a891da559d1",
  type: "page-type/song",
  slug: "kelly-clarkson-whyyawannabringmedown",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6e9f56ac-2a46-35a0-86c6-0bfcedae4e70",
      externalLink: "https://musicbrainz.org/work/6e9f56ac-2a46-35a0-86c6-0bfcedae4e70",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Whyyawannabringmedown",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
