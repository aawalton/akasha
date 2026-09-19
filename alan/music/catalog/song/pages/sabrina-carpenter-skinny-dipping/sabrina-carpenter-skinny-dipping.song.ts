import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterSkinnyDipping = {
  id: "01a0b723-d437-7caa-8127-d574a3e95be4",
  type: "page-type/song",
  slug: "sabrina-carpenter-skinny-dipping",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "600e8882-f79d-46c1-a2ee-6eb216a4e191",
      externalLink: "https://musicbrainz.org/work/600e8882-f79d-46c1-a2ee-6eb216a4e191",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "skinny dipping",
  artist: "artist/sabrina-carpenter",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
