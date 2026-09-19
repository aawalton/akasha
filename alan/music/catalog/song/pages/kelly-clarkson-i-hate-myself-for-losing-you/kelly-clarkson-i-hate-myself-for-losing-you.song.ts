import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonIHateMyselfForLosingYou = {
  id: "019ea4ad-6a0b-704c-814b-fab27c523c73",
  type: "page-type/song",
  slug: "kelly-clarkson-i-hate-myself-for-losing-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "31dd8f0c-45e6-3b31-be07-fe9c6bbbf8f1",
      externalLink: "https://musicbrainz.org/work/31dd8f0c-45e6-3b31-be07-fe9c6bbbf8f1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Hate Myself for Losing You",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
