import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterTheLifeOfAShowgirl = {
  id: "01a0b723-d914-7ea6-b1b3-a70045c9bed3",
  type: "page-type/song",
  slug: "sabrina-carpenter-the-life-of-a-showgirl",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e0e31026-dc50-4f9e-8414-b1f13ac1d593",
      externalLink: "https://musicbrainz.org/work/e0e31026-dc50-4f9e-8414-b1f13ac1d593",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Life of a Showgirl",
  artist: "artist/sabrina-carpenter",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
