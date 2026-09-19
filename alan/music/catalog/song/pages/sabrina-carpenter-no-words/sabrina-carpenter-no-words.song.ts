import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterNoWords = {
  id: "01a0b723-cd83-7c13-a13a-0419538dc8f1",
  type: "page-type/song",
  slug: "sabrina-carpenter-no-words",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c6fd1aa2-f219-4f71-8408-c98dfc7325a8",
      externalLink: "https://musicbrainz.org/work/c6fd1aa2-f219-4f71-8408-c98dfc7325a8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "No Words",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
