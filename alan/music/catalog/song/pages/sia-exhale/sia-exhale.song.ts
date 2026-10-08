import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaExhale = {
  id: "019ea4c2-8777-7fa9-b53b-ceba8669ac8b",
  type: "page-type/song",
  slug: "sia-exhale",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0377cd9f-dda5-400d-8ca0-a6c5554da1c1",
      externalLink: "https://musicbrainz.org/work/0377cd9f-dda5-400d-8ca0-a6c5554da1c1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "EXHALE",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:04:32.631Z",
  updatedAt: "2026-09-19T17:02:23.000Z",
} as const satisfies Song
