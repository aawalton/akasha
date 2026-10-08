import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonMedicine = {
  id: "019ea4ad-9ddd-7206-8000-d9694dd0b323",
  type: "page-type/song",
  slug: "kelly-clarkson-medicine",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "39a2e5f7-87e3-4aaa-8f56-3ababd757821",
      externalLink: "https://musicbrainz.org/work/39a2e5f7-87e3-4aaa-8f56-3ababd757821",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Medicine",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T00:41:42.109Z",
  updatedAt: "2026-09-19T16:29:09.000Z",
} as const satisfies Song
