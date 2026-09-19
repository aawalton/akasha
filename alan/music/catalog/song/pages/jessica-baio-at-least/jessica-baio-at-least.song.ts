import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jessicaBaioAtLeast = {
  id: "019ea4f6-e7e0-705c-85c2-6bfcdf8cae15",
  type: "page-type/song",
  slug: "jessica-baio-at-least",
  title: "at least",
  artist: "artist/jessica-baio",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "aa1071eb-6fcd-4481-8c65-a90411ce96d1",
      externalLink: "https://musicbrainz.org/recording/aa1071eb-6fcd-4481-8c65-a90411ce96d1",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
} as const satisfies Song
