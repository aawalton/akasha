import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonBehindTheseHazelEyes = {
  id: "019ea4af-bfe7-78e6-ba4e-a6cd0396b392",
  type: "page-type/song",
  slug: "kelly-clarkson-behind-these-hazel-eyes",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b374d34f-6b97-33a1-8895-079e0eceb235",
      externalLink: "https://musicbrainz.org/work/b374d34f-6b97-33a1-8895-079e0eceb235",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Behind These Hazel Eyes",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
