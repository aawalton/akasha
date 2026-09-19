import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterSkin = {
  id: "01a0b723-d7a4-75a5-a32c-929c6827a983",
  type: "page-type/song",
  slug: "sabrina-carpenter-skin",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b47eb2c6-c189-4753-87b0-4873f279082a",
      externalLink: "https://musicbrainz.org/work/b47eb2c6-c189-4753-87b0-4873f279082a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Skin",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
