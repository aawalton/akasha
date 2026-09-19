import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterIKnewYouWereTrouble = {
  id: "01a0b723-c9a1-714a-b0ff-3e9e35302186",
  type: "page-type/song",
  slug: "sabrina-carpenter-i-knew-you-were-trouble",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8a999d24-acbb-4992-b580-030b2fe83e90",
      externalLink: "https://musicbrainz.org/work/8a999d24-acbb-4992-b580-030b2fe83e90",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Knew You Were Trouble.",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
