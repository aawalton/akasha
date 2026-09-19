import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonJudas = {
  id: "019ea4b0-453b-7cc3-9120-fe70b4068ce2",
  type: "page-type/song",
  slug: "kelly-clarkson-judas",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d0937939-4903-4ae2-bf02-22bf8ef607cd",
      externalLink: "https://musicbrainz.org/work/d0937939-4903-4ae2-bf02-22bf8ef607cd",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Judas",
  artist: "artist/kelly-clarkson",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
