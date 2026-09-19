import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishBad = {
  id: "019ea4ab-0c4d-7d43-80f8-18cb9df7d62a",
  type: "page-type/song",
  slug: "billie-eilish-bad",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b06efbd2-1520-37d8-bb17-c27093451c42",
      externalLink: "https://musicbrainz.org/work/b06efbd2-1520-37d8-bb17-c27093451c42",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Bad",
  artist: "artist/billie-eilish",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
