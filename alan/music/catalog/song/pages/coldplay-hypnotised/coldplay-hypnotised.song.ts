import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayHypnotised = {
  id: "01a0ba5d-44b9-75d2-8d0f-b7991915384c",
  type: "page-type/song",
  slug: "coldplay-hypnotised",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b43c8285-c272-4654-8f8a-bd6ba149bff1",
      externalLink: "https://musicbrainz.org/work/b43c8285-c272-4654-8f8a-bd6ba149bff1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Hypnotised",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
