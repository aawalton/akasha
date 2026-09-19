import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonNowYouReGone = {
  id: "019ea49f-cffd-72e7-9f1e-eb5c277aa85a",
  type: "page-type/song",
  slug: "zara-larsson-now-you-re-gone",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "60ad0360-83f2-4d60-a1b5-f1e21fc7c8ca",
      externalLink: "https://musicbrainz.org/work/60ad0360-83f2-4d60-a1b5-f1e21fc7c8ca",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Now You’re Gone",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
