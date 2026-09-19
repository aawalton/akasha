import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sylviaDaleyNoiseCancellingHeadphones = {
  id: "01a0b725-aea6-7691-929e-28b124bd87b3",
  type: "page-type/song",
  slug: "sylvia-daley-noise-cancelling-headphones",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "87faa5f3-fc2e-483a-a2ff-1aff6a489bb2",
      externalLink: "https://musicbrainz.org/work/87faa5f3-fc2e-483a-a2ff-1aff6a489bb2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Noise Cancelling Headphones",
  artist: "artist/sylvia-daley",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
