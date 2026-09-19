import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterJuno = {
  id: "01a0b723-c626-7f7a-9b2c-f45db75f9e3b",
  type: "page-type/song",
  slug: "sabrina-carpenter-juno",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5eefb484-5609-4e75-8306-c0fe8c9611dd",
      externalLink: "https://musicbrainz.org/work/5eefb484-5609-4e75-8306-c0fe8c9611dd",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Juno",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
