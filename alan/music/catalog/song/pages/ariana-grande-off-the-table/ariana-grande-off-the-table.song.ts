import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeOffTheTable = {
  id: "019ea4e4-de44-7ed6-9508-435a15d235d4",
  type: "page-type/song",
  slug: "ariana-grande-off-the-table",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4594fd4d-cfb5-417f-8b71-245df81fd8eb",
      externalLink: "https://musicbrainz.org/work/4594fd4d-cfb5-417f-8b71-245df81fd8eb",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "off the table",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
