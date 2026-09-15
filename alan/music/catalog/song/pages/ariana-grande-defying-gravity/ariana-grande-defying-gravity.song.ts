import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeDefyingGravity = {
  id: "019ea4e1-ba3c-7744-8e36-5d88772e9f2f",
  type: "page-type/song",
  slug: "ariana-grande-defying-gravity",
  title: "Defying Gravity",
  artist: "artist/ariana-grande",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "707e83a7-9cfd-3471-a13e-198e61cdbc49",
      externalLink: "https://musicbrainz.org/work/707e83a7-9cfd-3471-a13e-198e61cdbc49",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
