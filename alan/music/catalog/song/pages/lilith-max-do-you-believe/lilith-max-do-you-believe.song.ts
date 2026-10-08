import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const lilithMaxDoYouBelieve = {
  id: "019ea4f5-faa4-7b7c-8c40-7f260a87a648",
  type: "page-type/song",
  slug: "lilith-max-do-you-believe",
  title: "Do You Believe",
  artist: "artist/lilith-max",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a434f84b-e3a6-4a81-8bd8-20671c78b5f2",
      externalLink: "https://musicbrainz.org/recording/a434f84b-e3a6-4a81-8bd8-20671c78b5f2",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  createdAt: "2026-06-08T02:00:44.452Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
