import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonHearMe = {
  id: "019ea4ae-4fc6-7c81-8aea-faae54e6a462",
  type: "page-type/song",
  slug: "kelly-clarkson-hear-me",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "55350852-9c6d-36f9-8531-bcab65ff2a0c",
      externalLink: "https://musicbrainz.org/work/55350852-9c6d-36f9-8531-bcab65ff2a0c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Hear Me",
  artist: "artist/kelly-clarkson",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
