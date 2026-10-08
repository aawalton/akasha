import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jessicaBaioPermanent = {
  id: "019ea4f8-72f7-7126-8336-3b84431a2453",
  type: "page-type/song",
  slug: "jessica-baio-permanent",
  title: "permanent",
  artist: "artist/jessica-baio",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b885c663-7d58-4a26-8e35-822f78c6447b",
      externalLink: "https://musicbrainz.org/recording/b885c663-7d58-4a26-8e35-822f78c6447b",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T02:03:26.327Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
