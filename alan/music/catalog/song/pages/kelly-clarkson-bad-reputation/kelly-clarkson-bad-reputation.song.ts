import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonBadReputation = {
  id: "019ea4ad-4b34-72e4-ad26-aacab4aff8a9",
  type: "page-type/song",
  slug: "kelly-clarkson-bad-reputation",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "23eb9cc3-fedf-40f8-9160-54b87f870ac4",
      externalLink: "https://musicbrainz.org/work/23eb9cc3-fedf-40f8-9160-54b87f870ac4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Bad Reputation",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T00:41:20.948Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
