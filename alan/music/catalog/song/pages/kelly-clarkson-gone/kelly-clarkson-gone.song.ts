import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonGone = {
  id: "019ea4af-d979-7b3e-a1e1-55915d165d7d",
  type: "page-type/song",
  slug: "kelly-clarkson-gone",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "bd482b75-57c4-39d3-908c-fb1a0d4224a9",
      externalLink: "https://musicbrainz.org/work/bd482b75-57c4-39d3-908c-fb1a0d4224a9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Gone",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
