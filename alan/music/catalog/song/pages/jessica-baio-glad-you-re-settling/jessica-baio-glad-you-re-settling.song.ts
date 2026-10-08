import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jessicaBaioGladYouReSettling = {
  id: "019ea4f7-8fff-7e62-b235-a49154758147",
  type: "page-type/song",
  slug: "jessica-baio-glad-you-re-settling",
  title: "glad you’re settling",
  artist: "artist/jessica-baio",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a76db0c1-8a04-4324-9178-91c95a0b17cf",
      externalLink: "https://musicbrainz.org/recording/a76db0c1-8a04-4324-9178-91c95a0b17cf",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T02:02:28.223Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
