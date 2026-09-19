import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaYouReNeverFullyDressedWithoutASmile = {
  id: "019ea4ce-618f-7568-a307-a73537a3735b",
  type: "page-type/song",
  slug: "sia-you-re-never-fully-dressed-without-a-smile",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e4277b25-d2c5-4d62-927d-50d0b6847957",
      externalLink: "https://musicbrainz.org/work/e4277b25-d2c5-4d62-927d-50d0b6847957",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "You’re Never Fully Dressed Without a Smile",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
