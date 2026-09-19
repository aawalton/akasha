import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayGravity = {
  id: "01a0ba5d-45c2-768e-ac49-0b5123304cd4",
  type: "page-type/song",
  slug: "coldplay-gravity",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "bdd636ca-38e5-42a1-945a-7f94347d5d59",
      externalLink: "https://musicbrainz.org/work/bdd636ca-38e5-42a1-945a-7f94347d5d59",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Gravity",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
