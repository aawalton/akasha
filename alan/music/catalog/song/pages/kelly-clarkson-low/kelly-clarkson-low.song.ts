import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonLow = {
  id: "019ea4af-5519-725a-9c96-2a3515168a37",
  type: "page-type/song",
  slug: "kelly-clarkson-low",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "91c516a7-f6c7-466d-83dc-75e7be3d3f5c",
      externalLink: "https://musicbrainz.org/work/91c516a7-f6c7-466d-83dc-75e7be3d3f5c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Low",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T00:43:34.553Z",
  updatedAt: "2026-09-19T16:29:09.000Z",
} as const satisfies Song
