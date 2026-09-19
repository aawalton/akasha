import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeFocus = {
  id: "019ea4e0-cde3-7b61-9acc-2c2cd9b54338",
  type: "page-type/song",
  slug: "ariana-grande-focus",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2a5cc6ba-8bd0-49ca-a2e9-1841422c8481",
      externalLink: "https://musicbrainz.org/work/2a5cc6ba-8bd0-49ca-a2e9-1841422c8481",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Focus",
  artist: "artist/ariana-grande",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
