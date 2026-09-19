import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaTheChurchOfWhatSHappeningNow = {
  id: "019ea4cc-7986-7fc9-b02e-ab4fcf4995cc",
  type: "page-type/song",
  slug: "sia-the-church-of-what-s-happening-now",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "62ae0c0b-f047-4bec-ab05-ce19254a4635",
      externalLink: "https://musicbrainz.org/work/62ae0c0b-f047-4bec-ab05-ce19254a4635",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Church of What’s Happening Now",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
