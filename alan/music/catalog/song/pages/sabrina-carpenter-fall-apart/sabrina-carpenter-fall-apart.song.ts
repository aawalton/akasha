import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterFallApart = {
  id: "01a0b723-cfd2-7e77-b2fb-79dbc34f68b4",
  type: "page-type/song",
  slug: "sabrina-carpenter-fall-apart",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f5acfa81-67bd-4a3f-878d-04f28f28e1e9",
      externalLink: "https://musicbrainz.org/work/f5acfa81-67bd-4a3f-878d-04f28f28e1e9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Fall Apart",
  artist: "artist/sabrina-carpenter",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
