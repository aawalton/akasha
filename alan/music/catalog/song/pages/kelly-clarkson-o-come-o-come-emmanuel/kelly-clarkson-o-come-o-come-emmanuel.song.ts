import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonOComeOComeEmmanuel = {
  id: "019ea4b1-4f76-77f9-b8ca-c2984aab8989",
  type: "page-type/song",
  slug: "kelly-clarkson-o-come-o-come-emmanuel",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "09d0b344-1396-4985-a3aa-d4b4db7e2b33",
      externalLink: "https://musicbrainz.org/work/09d0b344-1396-4985-a3aa-d4b4db7e2b33",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "O Come, O Come, Emmanuel",
  artist: "artist/kelly-clarkson",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
