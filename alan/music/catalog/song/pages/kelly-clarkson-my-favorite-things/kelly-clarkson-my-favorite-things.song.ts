import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonMyFavoriteThings = {
  id: "019ea4b0-d4f3-7dbd-baf9-2135bef475ad",
  type: "page-type/song",
  slug: "kelly-clarkson-my-favorite-things",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "edf0bfbc-c9e4-3b7d-9765-e8b86d9febbc",
      externalLink: "https://musicbrainz.org/work/edf0bfbc-c9e4-3b7d-9765-e8b86d9febbc",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "My Favorite Things",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
