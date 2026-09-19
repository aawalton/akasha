import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandePiano = {
  id: "019ea4e8-4190-7546-94f5-7031b2c1169c",
  type: "page-type/song",
  slug: "ariana-grande-piano",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "efc1df0c-9a48-43f6-9415-c08af6ef4f7b",
      externalLink: "https://musicbrainz.org/work/efc1df0c-9a48-43f6-9415-c08af6ef4f7b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Piano",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
