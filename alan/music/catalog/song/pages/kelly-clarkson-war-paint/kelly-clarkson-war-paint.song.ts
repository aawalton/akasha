import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonWarPaint = {
  id: "019ea4b1-a055-7184-909c-871089be40c4",
  type: "page-type/song",
  slug: "kelly-clarkson-war-paint",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "1f2db878-a1c4-4927-acb4-b67c33ee48bf",
      externalLink: "https://musicbrainz.org/work/1f2db878-a1c4-4927-acb4-b67c33ee48bf",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "War Paint",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
