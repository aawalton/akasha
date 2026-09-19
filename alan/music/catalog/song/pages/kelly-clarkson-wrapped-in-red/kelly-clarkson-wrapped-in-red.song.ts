import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonWrappedInRed = {
  id: "019ea4c1-58f8-7297-b214-cc04b2e9e61d",
  type: "page-type/song",
  slug: "kelly-clarkson-wrapped-in-red",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c10f55b4-3436-48a7-af11-fea6bcad8b7b",
      externalLink: "https://musicbrainz.org/work/c10f55b4-3436-48a7-af11-fea6bcad8b7b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Wrapped in Red",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
