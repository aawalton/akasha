import type { Song } from "akasha/alan/music/catalog/songs/song.page-type.types.ts"

export const arianaGrandeBetterOff = {
  id: "019ea4e3-e8a3-7e14-867c-47b571625aa4",
  type: "song",
  slug: "ariana-grande-better-off",
  title: "better off",
  artist: "artist/ariana-grande",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e9419c15-c359-4c82-91da-08dfafe158d5",
      externalLink: "https://musicbrainz.org/work/e9419c15-c359-4c82-91da-08dfafe158d5",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
