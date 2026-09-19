import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonWhiteChristmas = {
  id: "01a0ba7f-b876-772c-85e9-b693713c3d2f",
  type: "page-type/song",
  slug: "kelly-clarkson-white-christmas",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "30daa999-81af-34c3-bf22-b3c1c41c8c01",
      externalLink: "https://musicbrainz.org/work/30daa999-81af-34c3-bf22-b3c1c41c8c01",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "White Christmas",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
