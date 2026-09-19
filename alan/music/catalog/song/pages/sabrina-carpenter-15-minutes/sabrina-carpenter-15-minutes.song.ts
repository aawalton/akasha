import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenter15Minutes = {
  id: "01a0b723-c7f0-7fe0-8591-a607204f7bbc",
  type: "page-type/song",
  slug: "sabrina-carpenter-15-minutes",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7ac0c42d-f6d6-4b07-866c-b628fc3ca2ed",
      externalLink: "https://musicbrainz.org/work/7ac0c42d-f6d6-4b07-866c-b628fc3ca2ed",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "15 Minutes",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
