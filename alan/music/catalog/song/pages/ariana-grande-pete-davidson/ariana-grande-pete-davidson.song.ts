import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandePeteDavidson = {
  id: "019ea4e7-d5a6-7ed7-a37e-89668efea557",
  type: "page-type/song",
  slug: "ariana-grande-pete-davidson",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "dbe81153-81fb-4009-a2a7-27e78d8d05ce",
      externalLink: "https://musicbrainz.org/work/dbe81153-81fb-4009-a2a7-27e78d8d05ce",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "pete davidson",
  artist: "artist/ariana-grande",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
