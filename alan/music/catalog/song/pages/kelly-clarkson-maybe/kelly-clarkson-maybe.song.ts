import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonMaybe = {
  id: "019ea4af-dfe3-7731-bdfa-6bf697af28e3",
  type: "page-type/song",
  slug: "kelly-clarkson-maybe",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c294e115-d214-479f-80f7-a6610fa4a10d",
      externalLink: "https://musicbrainz.org/work/c294e115-d214-479f-80f7-a6610fa4a10d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Maybe",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
