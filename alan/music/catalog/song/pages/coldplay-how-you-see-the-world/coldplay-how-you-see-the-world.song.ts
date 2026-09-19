import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayHowYouSeeTheWorld = {
  id: "01a0ba5d-45e2-7d08-8465-0cd3f75bb1cc",
  type: "page-type/song",
  slug: "coldplay-how-you-see-the-world",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c12c3ba0-e7bc-4b7c-8024-49dca70d62a3",
      externalLink: "https://musicbrainz.org/work/c12c3ba0-e7bc-4b7c-8024-49dca70d62a3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "How You See the World",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
