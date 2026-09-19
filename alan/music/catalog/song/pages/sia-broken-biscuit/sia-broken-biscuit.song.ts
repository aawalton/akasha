import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaBrokenBiscuit = {
  id: "019ea4c5-2504-7612-add1-508c88702514",
  type: "page-type/song",
  slug: "sia-broken-biscuit",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a2d5df7c-eb6a-4df3-ab52-6ad3c47adf64",
      externalLink: "https://musicbrainz.org/work/a2d5df7c-eb6a-4df3-ab52-6ad3c47adf64",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Broken Biscuit",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
