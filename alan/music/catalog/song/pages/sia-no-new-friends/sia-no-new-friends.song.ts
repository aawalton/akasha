import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaNoNewFriends = {
  id: "019ea4c6-cb25-7152-b074-5bf743023162",
  type: "page-type/song",
  slug: "sia-no-new-friends",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0af416fe-6ed4-4779-9b4a-4ac69a222506",
      externalLink: "https://musicbrainz.org/work/0af416fe-6ed4-4779-9b4a-4ac69a222506",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "No New Friends",
  artist: "artist/sia",
  performed: false,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
