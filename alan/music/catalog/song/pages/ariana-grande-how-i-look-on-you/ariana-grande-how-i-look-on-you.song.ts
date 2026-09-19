import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeHowILookOnYou = {
  id: "019ea4e3-9627-70c6-9ca4-8977eced8910",
  type: "page-type/song",
  slug: "ariana-grande-how-i-look-on-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e0a4d3d4-fe51-4c09-9369-f00ec9c65309",
      externalLink: "https://musicbrainz.org/work/e0a4d3d4-fe51-4c09-9369-f00ec9c65309",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "How I Look on You",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
