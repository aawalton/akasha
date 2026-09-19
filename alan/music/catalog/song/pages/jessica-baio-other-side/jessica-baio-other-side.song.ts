import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jessicaBaioOtherSide = {
  id: "019ea4f8-53ee-7960-a8c6-4550fbae96fd",
  type: "page-type/song",
  slug: "jessica-baio-other-side",
  title: "other side",
  artist: "artist/jessica-baio",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "796947b0-e85d-471b-bd09-4b4cff93b3b3",
      externalLink: "https://musicbrainz.org/recording/796947b0-e85d-471b-bd09-4b4cff93b3b3",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
