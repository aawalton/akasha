import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayWhatIf = {
  id: "01a0ba5d-4b3d-7281-a277-de8980a19675",
  type: "page-type/song",
  slug: "coldplay-what-if",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "08ed9608-e800-343e-8ac8-9508f157a745",
      externalLink: "https://musicbrainz.org/work/08ed9608-e800-343e-8ac8-9508f157a745",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "What If",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
