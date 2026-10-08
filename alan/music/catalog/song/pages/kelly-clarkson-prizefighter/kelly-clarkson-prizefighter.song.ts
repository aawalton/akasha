import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonPrizefighter = {
  id: "019ea4b1-2ed7-7482-8aa9-ecccfac6a76e",
  type: "page-type/song",
  slug: "kelly-clarkson-prizefighter",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "050fea11-6c9c-43cb-aa20-036fd0935456",
      externalLink: "https://musicbrainz.org/work/050fea11-6c9c-43cb-aa20-036fd0935456",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "PrizeFighter",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T00:45:35.831Z",
  updatedAt: "2026-09-19T16:29:09.000Z",
} as const satisfies Song
