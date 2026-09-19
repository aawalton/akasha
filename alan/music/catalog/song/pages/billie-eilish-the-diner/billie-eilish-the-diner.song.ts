import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishTheDiner = {
  id: "019ea4aa-4ea8-73da-ab4d-6352663dd80d",
  type: "page-type/song",
  slug: "billie-eilish-the-diner",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "80b2b437-eaa4-4232-aaed-7e9f1f675684",
      externalLink: "https://musicbrainz.org/work/80b2b437-eaa4-4232-aaed-7e9f1f675684",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "THE DINER",
  artist: "artist/billie-eilish",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
