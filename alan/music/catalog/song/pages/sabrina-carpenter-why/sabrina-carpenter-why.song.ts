import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterWhy = {
  id: "01a0b723-d28d-7658-8085-d97cc0a29a62",
  type: "page-type/song",
  slug: "sabrina-carpenter-why",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "387a2404-314c-4aaf-bc83-9895ead481c0",
      externalLink: "https://musicbrainz.org/work/387a2404-314c-4aaf-bc83-9895ead481c0",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Why",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
