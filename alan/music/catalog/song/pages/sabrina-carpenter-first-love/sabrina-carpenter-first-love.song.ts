import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterFirstLove = {
  id: "01a0b723-c35f-7b32-a630-e479b98c5e5b",
  type: "page-type/song",
  slug: "sabrina-carpenter-first-love",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "350ab7c0-ffcb-47ed-accd-fe8f1cdf86cb",
      externalLink: "https://musicbrainz.org/work/350ab7c0-ffcb-47ed-accd-fe8f1cdf86cb",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "First Love",
  artist: "artist/sabrina-carpenter",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
