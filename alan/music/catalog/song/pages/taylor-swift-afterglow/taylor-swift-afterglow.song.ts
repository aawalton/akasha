import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftAfterglow = {
  id: "019ea416-1164-73ac-9224-9b8106bba941",
  type: "page-type/song",
  slug: "taylor-swift-afterglow",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ab84673d-bcef-454d-8294-9585d7b7f942",
      externalLink: "https://musicbrainz.org/work/ab84673d-bcef-454d-8294-9585d7b7f942",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Afterglow",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
