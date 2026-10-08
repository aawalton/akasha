import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonWhatHappensHere = {
  id: "019ea4a0-5996-70f5-94ae-f45bceb398d7",
  type: "page-type/song",
  slug: "zara-larsson-what-happens-here",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8df788f9-3c40-4623-93ff-ef0eca47acd2",
      externalLink: "https://musicbrainz.org/work/8df788f9-3c40-4623-93ff-ef0eca47acd2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "What Happens Here",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T00:27:12.662Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
