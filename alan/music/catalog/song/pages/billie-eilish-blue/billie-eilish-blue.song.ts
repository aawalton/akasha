import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishBlue = {
  id: "019ea4aa-e37f-7756-9938-277f33f05569",
  type: "page-type/song",
  slug: "billie-eilish-blue",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a97737f7-a1c2-4c2e-92ad-d5cf48ffd1ce",
      externalLink: "https://musicbrainz.org/work/a97737f7-a1c2-4c2e-92ad-d5cf48ffd1ce",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "BLUE",
  artist: "artist/billie-eilish",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
