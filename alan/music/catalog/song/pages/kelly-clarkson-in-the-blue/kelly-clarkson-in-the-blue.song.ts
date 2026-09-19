import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonInTheBlue = {
  id: "019ea4ae-2c51-783a-9b10-a9249a4f9437",
  type: "page-type/song",
  slug: "kelly-clarkson-in-the-blue",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4d4568b9-e6ac-4841-919c-97edb6809fbe",
      externalLink: "https://musicbrainz.org/work/4d4568b9-e6ac-4841-919c-97edb6809fbe",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "In the Blue",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
