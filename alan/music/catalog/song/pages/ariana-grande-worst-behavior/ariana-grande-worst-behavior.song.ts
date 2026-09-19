import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeWorstBehavior = {
  id: "019ea4e7-b7c8-7a3a-9ffe-d0e19328ae82",
  type: "page-type/song",
  slug: "ariana-grande-worst-behavior",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "daf8e16f-1414-44c4-a0eb-0b26ed9d660d",
      externalLink: "https://musicbrainz.org/work/daf8e16f-1414-44c4-a0eb-0b26ed9d660d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "worst behavior",
  artist: "artist/ariana-grande",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
