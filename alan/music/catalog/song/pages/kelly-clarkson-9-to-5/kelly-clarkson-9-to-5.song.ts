import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarkson9To5 = {
  id: "019ea4ac-c590-7c58-ba2b-87ce2157d817",
  type: "page-type/song",
  slug: "kelly-clarkson-9-to-5",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0a60c381-5eb0-3c0e-a368-2f562bb6da95",
      externalLink: "https://musicbrainz.org/work/0a60c381-5eb0-3c0e-a368-2f562bb6da95",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "9 to 5",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
