import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayOldFriends = {
  id: "01a0ba5d-5349-7755-8b49-64d3b3c7da6f",
  type: "page-type/song",
  slug: "coldplay-old-friends",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "763ea8b4-f3ae-4bcf-bb32-60cfb6b28713",
      externalLink: "https://musicbrainz.org/work/763ea8b4-f3ae-4bcf-bb32-60cfb6b28713",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Old Friends",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
