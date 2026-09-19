import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterSilverNights = {
  id: "01a0b723-d50f-7924-9068-bbb81b008c51",
  type: "page-type/song",
  slug: "sabrina-carpenter-silver-nights",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "743d8410-4b23-4262-af11-c5ffb104edfe",
      externalLink: "https://musicbrainz.org/work/743d8410-4b23-4262-af11-c5ffb104edfe",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Silver Nights",
  artist: "artist/sabrina-carpenter",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
