import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const girlInRedIllCallYouMine = {
  id: "01a0b724-d241-74c8-b114-0ada3bd91c1c",
  type: "page-type/song",
  slug: "girl-in-red-ill-call-you-mine",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "436202a6-a4b0-4f09-99ef-f46ae767c3b6",
      externalLink: "https://musicbrainz.org/work/436202a6-a4b0-4f09-99ef-f46ae767c3b6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I’ll Call You Mine",
  artist: "artist/girl-in-red",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
