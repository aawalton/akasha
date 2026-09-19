import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonStrongerWhatDoesnTKillYou = {
  id: "019ea4b2-0167-78cd-ad23-6354ed0cbd55",
  type: "page-type/song",
  slug: "kelly-clarkson-stronger-what-doesn-t-kill-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "442c9ca8-ea7a-4769-b349-2c11cb078c61",
      externalLink: "https://musicbrainz.org/work/442c9ca8-ea7a-4769-b349-2c11cb078c61",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Stronger (What Doesn't Kill You)",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
