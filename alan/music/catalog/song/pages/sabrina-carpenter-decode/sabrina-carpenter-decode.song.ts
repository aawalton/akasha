import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterDecode = {
  id: "01a0b723-cb01-717e-bbee-1c2023dc7561",
  type: "page-type/song",
  slug: "sabrina-carpenter-decode",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a3ddf8c6-8564-4fc8-8270-7ceffd958987",
      externalLink: "https://musicbrainz.org/work/a3ddf8c6-8564-4fc8-8270-7ceffd958987",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "decode",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-09-19T00:49:31.393Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
