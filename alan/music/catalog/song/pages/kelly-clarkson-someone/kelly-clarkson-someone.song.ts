import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonSomeone = {
  id: "019ea4c1-0591-7c0b-83f2-cc909c49d1f8",
  type: "page-type/song",
  slug: "kelly-clarkson-someone",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a41f929d-894a-4503-bc89-65b115401ab3",
      externalLink: "https://musicbrainz.org/work/a41f929d-894a-4503-bc89-65b115401ab3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Someone",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:02:53.841Z",
  updatedAt: "2026-09-19T16:29:09.000Z",
} as const satisfies Song
