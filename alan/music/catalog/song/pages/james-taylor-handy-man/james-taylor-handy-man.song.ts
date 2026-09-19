import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorHandyMan = {
  id: "01a0b72f-277f-7af8-b8ff-f0f673082ff5",
  type: "page-type/song",
  slug: "james-taylor-handy-man",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "798d5053-4980-306a-95ac-d7467625266c",
      externalLink: "https://musicbrainz.org/work/798d5053-4980-306a-95ac-d7467625266c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Handy Man",
  artist: "artist/james-taylor",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
