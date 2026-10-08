import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonWhatTheySay = {
  id: "019ea4a0-c0f0-7a9b-9ceb-3914b1776a83",
  type: "page-type/song",
  slug: "zara-larsson-what-they-say",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a5b8ca86-d496-4b86-8acc-260d07df119a",
      externalLink: "https://musicbrainz.org/work/a5b8ca86-d496-4b86-8acc-260d07df119a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "What They Say",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T00:27:39.120Z",
  updatedAt: "2026-09-19T16:47:26.000Z",
} as const satisfies Song
