import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsSuckerForPain = {
  id: "019ea49d-00f2-7209-85c5-47e05406009c",
  type: "page-type/song",
  slug: "imagine-dragons-sucker-for-pain",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e6d89d6d-51ea-4758-b207-5041a5e1426b",
      externalLink: "https://musicbrainz.org/work/e6d89d6d-51ea-4758-b207-5041a5e1426b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Sucker for Pain",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
