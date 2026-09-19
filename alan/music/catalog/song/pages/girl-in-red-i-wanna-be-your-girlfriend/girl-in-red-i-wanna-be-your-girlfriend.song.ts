import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const girlInRedIWannaBeYourGirlfriend = {
  id: "01a0b724-d3a7-72ae-9623-9b57b8f20f8d",
  type: "page-type/song",
  slug: "girl-in-red-i-wanna-be-your-girlfriend",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "90493846-4ab9-40dd-bc06-53fe6cd42dc6",
      externalLink: "https://musicbrainz.org/work/90493846-4ab9-40dd-bc06-53fe6cd42dc6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "i wanna be your girlfriend",
  artist: "artist/girl-in-red",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
