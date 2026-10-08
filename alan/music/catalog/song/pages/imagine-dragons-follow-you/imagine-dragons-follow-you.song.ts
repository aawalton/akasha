import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsFollowYou = {
  id: "019ea497-be53-7123-b0e1-7807bccb36b4",
  type: "page-type/song",
  slug: "imagine-dragons-follow-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "434e5850-76f3-4eaa-98c2-c93c613fad9f",
      externalLink: "https://musicbrainz.org/work/434e5850-76f3-4eaa-98c2-c93c613fad9f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Follow You",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T00:17:48.627Z",
  updatedAt: "2026-09-19T16:40:46.000Z",
} as const satisfies Song
