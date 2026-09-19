import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayTheHardestPart = {
  id: "01a0ba60-fba6-776b-a547-5c8ebec7a5bf",
  type: "page-type/song",
  slug: "coldplay-the-hardest-part",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d69c120f-52f1-3bca-8d30-ddad985460ff",
      externalLink: "https://musicbrainz.org/work/d69c120f-52f1-3bca-8d30-ddad985460ff",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Hardest Part",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
