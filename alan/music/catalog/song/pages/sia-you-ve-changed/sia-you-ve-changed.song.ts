import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaYouVeChanged = {
  id: "019ea4cc-91fa-7485-8df3-853592d42d39",
  type: "page-type/song",
  slug: "sia-you-ve-changed",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "66b9356d-d40b-4b25-818e-e96473b6e7b9",
      externalLink: "https://musicbrainz.org/work/66b9356d-d40b-4b25-818e-e96473b6e7b9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "You’ve Changed",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
