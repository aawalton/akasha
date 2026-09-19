import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeLikeIDo = {
  id: "01a0b76f-ecc0-7def-9e41-b1e70d4c5ae5",
  type: "page-type/song",
  slug: "ariana-grande-like-i-do",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e5b41533-73eb-47be-8f08-82e9e0f93ea4",
      externalLink: "https://musicbrainz.org/work/e5b41533-73eb-47be-8f08-82e9e0f93ea4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "like i do",
  artist: "artist/ariana-grande",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
