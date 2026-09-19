import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeLovinIt = {
  id: "019ea4e4-14b5-7fda-b0f0-e678e32db3ed",
  type: "page-type/song",
  slug: "ariana-grande-lovin-it",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0b7b0187-1507-4a4d-9ad3-fc201c0e1c64",
      externalLink: "https://musicbrainz.org/work/0b7b0187-1507-4a4d-9ad3-fc201c0e1c64",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Lovin' It",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
