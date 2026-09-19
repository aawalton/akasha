import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterYourLovesLike = {
  id: "01a0b723-da00-7733-9370-ba5a9f55087c",
  type: "page-type/song",
  slug: "sabrina-carpenter-your-loves-like",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f923f5e8-29ce-498a-a159-a45fd9af3e97",
      externalLink: "https://musicbrainz.org/work/f923f5e8-29ce-498a-a159-a45fd9af3e97",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Your Love’s Like",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
