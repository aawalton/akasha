import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonAllIAskOfYou = {
  id: "019ea4ae-c6d4-7fa7-9df8-20b4900fa7fd",
  type: "page-type/song",
  slug: "kelly-clarkson-all-i-ask-of-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "63ecc754-d3a2-3cc5-94c7-d7017294ff25",
      externalLink: "https://musicbrainz.org/work/63ecc754-d3a2-3cc5-94c7-d7017294ff25",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "All I Ask of You",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
