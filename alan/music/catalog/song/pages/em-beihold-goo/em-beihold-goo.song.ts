import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const emBeiholdGoo = {
  id: "019ea4de-e938-7715-b3ff-ce6951baacaa",
  type: "page-type/song",
  slug: "em-beihold-goo",
  title: "Goo",
  artist: "artist/em-beihold",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0b734b72-f8d8-4f7b-acd0-323805e9fe2b",
      externalLink: "https://musicbrainz.org/work/0b734b72-f8d8-4f7b-acd0-323805e9fe2b",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
