import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterMyManOnWillpower = {
  id: "01a0b723-c009-7497-8c09-9edd90da593d",
  type: "page-type/song",
  slug: "sabrina-carpenter-my-man-on-willpower",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "04717cf9-2009-4ab2-b442-e2f09fbcaaa9",
      externalLink: "https://musicbrainz.org/work/04717cf9-2009-4ab2-b442-e2f09fbcaaa9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "My Man on Willpower",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
