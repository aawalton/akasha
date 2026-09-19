import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonIfICanTHaveYou = {
  id: "019ea4b0-aa53-7105-819e-cc3d3385d16c",
  type: "page-type/song",
  slug: "kelly-clarkson-if-i-can-t-have-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "dbd6ad0c-9456-3770-804e-5868d7e8638f",
      externalLink: "https://musicbrainz.org/work/dbd6ad0c-9456-3770-804e-5868d7e8638f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "If I Can't Have You",
  artist: "artist/kelly-clarkson",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
