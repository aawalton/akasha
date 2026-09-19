import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jisooTears = {
  id: "01a0b724-38a1-7908-9e3c-c568bea26fa5",
  type: "page-type/song",
  slug: "jisoo-tears",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8a29ffbd-957f-4ba3-922a-798bfe12c0d8",
      externalLink: "https://musicbrainz.org/work/8a29ffbd-957f-4ba3-922a-798bfe12c0d8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "TEARS",
  artist: "artist/jisoo",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
