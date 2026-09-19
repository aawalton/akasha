import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterTwoYoungHearts = {
  id: "01a0b723-d398-761d-9b6b-19abdcd9823a",
  type: "page-type/song",
  slug: "sabrina-carpenter-two-young-hearts",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "47b04ef0-37cf-4bb4-b39e-283c0ab4f9ab",
      externalLink: "https://musicbrainz.org/work/47b04ef0-37cf-4bb4-b39e-283c0ab4f9ab",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Two Young Hearts",
  artist: "artist/sabrina-carpenter",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
