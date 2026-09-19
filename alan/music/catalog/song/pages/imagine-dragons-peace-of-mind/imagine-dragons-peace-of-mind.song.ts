import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsPeaceOfMind = {
  id: "019ea49b-5df4-7948-b501-7528e32f3441",
  type: "page-type/song",
  slug: "imagine-dragons-peace-of-mind",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0a74ce1c-2dbf-4cf8-b28d-23e74f2ad08b",
      externalLink: "https://musicbrainz.org/work/0a74ce1c-2dbf-4cf8-b28d-23e74f2ad08b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Peace of Mind",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
