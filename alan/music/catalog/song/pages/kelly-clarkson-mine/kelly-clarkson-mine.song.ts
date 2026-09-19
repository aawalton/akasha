import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonMine = {
  id: "019ea4af-b964-76ce-96f8-e914153cc8ad",
  type: "page-type/song",
  slug: "kelly-clarkson-mine",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b153942d-c3f3-4658-a172-9479d033a599",
      externalLink: "https://musicbrainz.org/work/b153942d-c3f3-4658-a172-9479d033a599",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "mine",
  artist: "artist/kelly-clarkson",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
