import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeIntoYou = {
  id: "019ea4e3-3f98-7e7f-bf87-aede016d822f",
  type: "page-type/song",
  slug: "ariana-grande-into-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d176eb30-6412-4612-b3c7-e0012393ab65",
      externalLink: "https://musicbrainz.org/work/d176eb30-6412-4612-b3c7-e0012393ab65",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Into You",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
