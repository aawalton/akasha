import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorOnlyADreamInRio = {
  id: "01a0b72f-3989-71f6-b79d-ef6c6c032b93",
  type: "page-type/song",
  slug: "james-taylor-only-a-dream-in-rio",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7dc1dc47-07a4-4800-bc9d-61c78fbb3b46",
      externalLink: "https://musicbrainz.org/work/7dc1dc47-07a4-4800-bc9d-61c78fbb3b46",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Only a Dream in Rio",
  artist: "artist/james-taylor",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
