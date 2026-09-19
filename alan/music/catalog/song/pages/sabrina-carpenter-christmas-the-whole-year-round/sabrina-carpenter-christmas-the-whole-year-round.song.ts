import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterChristmasTheWholeYearRound = {
  id: "01a0b723-c526-7257-a0a0-a2de5c144853",
  type: "page-type/song",
  slug: "sabrina-carpenter-christmas-the-whole-year-round",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "504708dd-65b7-4d7a-ae4d-372f85423d72",
      externalLink: "https://musicbrainz.org/work/504708dd-65b7-4d7a-ae4d-372f85423d72",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Christmas the Whole Year Round",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
