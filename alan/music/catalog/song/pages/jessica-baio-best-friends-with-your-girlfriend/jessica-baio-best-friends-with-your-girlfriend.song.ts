import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jessicaBaioBestFriendsWithYourGirlfriend = {
  id: "019ea4f7-1646-7135-8a63-b8336fe32029",
  type: "page-type/song",
  slug: "jessica-baio-best-friends-with-your-girlfriend",
  title: "best friends with your girlfriend",
  artist: "artist/jessica-baio",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5bed71b2-d6c9-4f5f-b304-460694787966",
      externalLink: "https://musicbrainz.org/recording/5bed71b2-d6c9-4f5f-b304-460694787966",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
