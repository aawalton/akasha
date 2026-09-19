import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaChandelier = {
  id: "019ea4c4-f9e0-7306-8c74-4dd8eca30736",
  type: "page-type/song",
  slug: "sia-chandelier",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9ad070d4-83e9-4404-9444-64ad5de092fa",
      externalLink: "https://musicbrainz.org/work/9ad070d4-83e9-4404-9444-64ad5de092fa",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Chandelier",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
