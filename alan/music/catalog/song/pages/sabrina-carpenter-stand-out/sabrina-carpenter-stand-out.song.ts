import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterStandOut = {
  id: "01a0b723-d99c-7dc9-9db9-83f1061f04bb",
  type: "page-type/song",
  slug: "sabrina-carpenter-stand-out",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e4ce72fd-d787-4934-b203-f43124a17c3d",
      externalLink: "https://musicbrainz.org/work/e4ce72fd-d787-4934-b203-f43124a17c3d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Stand Out",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
