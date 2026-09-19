import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeFantasize = {
  id: "019ea4e3-7273-7ae8-8ea6-7e1bd002fb3b",
  type: "page-type/song",
  slug: "ariana-grande-fantasize",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "dd7e2ca0-0ff0-4ec6-8dcc-613358a458cf",
      externalLink: "https://musicbrainz.org/work/dd7e2ca0-0ff0-4ec6-8dcc-613358a458cf",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Fantasize",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
